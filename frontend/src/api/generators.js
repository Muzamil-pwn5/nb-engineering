import { generators } from "../data/catalog.js";

export function getGenerators() {
  return Promise.resolve(generators);
}

export function getGenerator(slug) {
  const generator = generators.find((item) => item.slug === slug);
  return generator
    ? Promise.resolve(generator)
    : Promise.reject(new Error("Generator not found."));
}
