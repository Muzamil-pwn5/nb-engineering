import apiRequest from "./client";

export async function getGenerators() {
  return apiRequest("/generators");
}

export async function getGenerator(slug) {
  return apiRequest(`/generators/${slug}`);
}