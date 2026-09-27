const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `API Error ${response.status}: ${
        errorText || response.statusText
      }`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export default apiRequest;