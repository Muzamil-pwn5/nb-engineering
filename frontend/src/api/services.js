import { services } from "../data/catalog.js";

export function getServices() {
  return Promise.resolve(services);
}

export function getService(slug) {
  const service = services.find((item) => item.slug === slug);
  return service
    ? Promise.resolve(service)
    : Promise.reject(new Error("Service not found."));
}
