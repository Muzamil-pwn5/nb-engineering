import apiRequest from "./client.js";

const configuredApi = import.meta.env.VITE_API_BASE_URL;

export async function submitInquiry(payload) {
  if (configuredApi) {
    return apiRequest("/inquiries", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      "form-name": "nb-inquiry",
      "bot-field": "",
      ...payload,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Netlify Forms submission failed: ${response.status}`);
  }

  return { status: "received", channel: "netlify-form" };
}
