export type ProductCategory = "garden" | "solar" | "street";

export type Product = {
  slug: string;
  model: string;
  category: ProductCategory;
  page: number;
  wattage: string;
  size: string;
  efficacy: string;
  featured?: boolean;
};

const product = (
  page: number,
  model: string,
  category: ProductCategory,
  wattage: string,
  size: string,
  featured = false,
): Product => ({
  slug: model.toLowerCase().replaceAll("/", "-and-").replaceAll(" ", "-"),
  model,
  category,
  page,
  wattage,
  size,
  efficacy: category === "street" ? "Up to 150 lm/W" : category === "solar" ? "Autonomous solar" : "Up to 120 lm/W",
  featured,
});

export const products: Product[] = [
  product(5, "WJH-6001A", "garden", "20-100W", "550 x 490 x 648 mm", true),
  product(6, "WJH-6001B", "garden", "Up to 100W", "Project configured"),
  product(7, "WJH-6003A / 6003B", "garden", "20-100W", "550 x 490 x 265 mm", true),
  product(8, "WJH-6006A / 6006B", "garden", "20-100W", "550 x 490 x 165 mm"),
  product(9, "WJH-6007", "garden", "20-60W", "490 x 490 x 658 mm"),
  product(11, "WJH-6008", "garden", "20-100W", "620 x 620 x 558 mm"),
  product(13, "WJH-6009A / 6009B", "garden", "20-240W", "Two housing sizes"),
  product(15, "WJH-6013", "garden", "20-60W", "472 x 472 x 316 mm"),
  product(17, "WJH-6016", "garden", "20-60W", "550 x 550 x 573 mm"),
  product(19, "WJH-6018", "garden", "20-240W", "Two housing sizes", true),
  product(21, "WJH-6019", "garden", "20-80W", "470 x 470 x 318 mm"),
  product(22, "WJH-6026", "garden", "20-80W", "600 x 600 x 480 mm"),
  product(23, "WJH-6027", "garden", "20-60W", "580 x 580 x 264 mm"),
  product(24, "WJH-6028", "garden", "20-60W", "560 x 560 x 372 mm"),
  product(25, "WJH-6031", "garden", "20-50W", "480 x 480 x 420 mm"),
  product(26, "WJH-6036", "garden", "20-60W", "502 x 502 x 470 mm"),
  product(27, "WJH-6038", "garden", "20-60W", "473 x 473 x 142 mm"),
  product(28, "WJH-6039", "garden", "20-60W", "370 x 370 x 780 mm"),
  product(29, "WJH-6061A / B / C", "garden", "20-60W", "Three form factors"),
  product(30, "WJH-6063", "garden", "20-80W", "628 x 628 x 475 mm"),
  product(31, "WJH-6066", "garden", "20-40W", "408 x 408 x 700 mm"),
  product(32, "WJH-6067", "garden", "20-30W", "236 x 236 x 660 mm"),
  product(33, "WJH-6068", "garden", "20-30W", "500 x 500 x 885 mm"),
  product(34, "WJH-6069", "garden", "20-100W", "457 x 457 x 575 mm"),
  product(35, "WJH-6072 / 6076", "garden", "20-30W", "Two housing sizes"),
  product(36, "WJH-6078", "garden", "20-80W", "500 x 500 x 490 mm"),
  product(37, "WJH-6081A / 6081B", "garden", "20-100W", "450 x 450 x 523 mm"),
  product(39, "WJH-6082", "solar", "Integrated solar", "700 x 700 x 768 mm", true),
  product(40, "WJH-6086", "solar", "Integrated solar", "472 x 472 x 316 mm"),
  product(41, "WJH-6087", "solar", "Integrated solar", "472 x 472 x 316 mm"),
  product(42, "WJH-6088", "solar", "Integrated solar", "472 x 472 x 316 mm"),
  product(43, "WJH-6089", "solar", "Integrated solar", "472 x 472 x 316 mm"),
  product(45, "WJH-6091", "street", "Project configured", "Multiple housings", true),
  product(46, "WJH-6093", "street", "20-220W", "Two housing sizes"),
  product(48, "WJH-6094", "street", "20-320W", "Five housing sizes", true),
  product(49, "WJH-6096", "street", "30-320W", "Four housing sizes"),
  product(50, "WJH-6098", "street", "20-200W", "Project configured"),
  product(51, "WJH-6099", "street", "20-300W", "Project configured"),
  product(52, "WJH-6101", "street", "30-360W", "Six housing sizes"),
  product(53, "WJH-6103", "street", "30-360W", "Six housing sizes", true),
];

export const categoryLabels: Record<ProductCategory, string> = {
  garden: "Garden & post-top",
  solar: "Solar lighting",
  street: "LED street lighting",
};

export function productImage(model: string) {
  const stem = model.split(" / ")[0].trim();
  return `/products/${stem}.jpg`;
}

export const sharedSpecifications = {
  Housing: "Die-cast aluminium",
  Input: "AC 90-305V or AC 220-240V",
  Optics: "PC standard / PMMA optional",
  "Colour temperature": "3000K, 4000K, 6000K or amber",
  CRI: "70+ or 80+",
  Protection: "IP66 / IK08",
  "Electrical class": "Class I or Class II",
  Operation: "-35°C to 50°C / 10-95% humidity",
  Lifetime: "Up to 100,000 hours (L70, Ta 25°C)",
  Controls: "DALI / 1-10V / timing / PWM",
};

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}
