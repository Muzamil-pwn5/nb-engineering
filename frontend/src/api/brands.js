export function getBrands() {
  const brands = [
    { name: "Caterpillar", slug: "caterpillar", description: "Caterpillar power generation equipment and solutions.", is_active: true, id: 3 },
    { name: "Cummins", slug: "cummins", description: "Cummins generator and power generation solutions.", is_active: true, id: 2 },
    { name: "FG Wilson", slug: "fg-wilson", description: "FG Wilson diesel generator solutions.", is_active: true, id: 1 },
    { name: "Perkins", slug: "perkins", description: "Perkins-powered generator solutions.", is_active: true, id: 4 },
  ];
  return Promise.resolve(brands);
}

export function getBrand(slug) {
  return getBrands().then((brands) => brands.find((brand) => brand.slug === slug));
}
