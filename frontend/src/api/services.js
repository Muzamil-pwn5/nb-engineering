import apiRequest from "./client";

export async function getServices() {
  const response = await apiRequest("/services");

  if (Array.isArray(response)) {
    return response;
  }

  if (response && Array.isArray(response.value)) {
    return response.value;
  }

  throw new Error("Invalid services response from server.");
}

export async function getService(slug) {
  const response = await apiRequest(`/services/${slug}`);

  if (response && typeof response === "object") {
    if (Array.isArray(response)) {
      throw new Error("Invalid service response from server.");
    }

    if (response.value && typeof response.value === "object") {
      return response.value;
    }

    return response;
  }

  throw new Error("Invalid service response from server.");
}