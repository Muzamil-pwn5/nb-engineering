import apiRequest from "./client";

export async function getBrands() {
  const response = await apiRequest("/brands");
  return response.value;
}

export async function getBrand(slug) {
  return apiRequest(`/brands/${slug}`);
}
