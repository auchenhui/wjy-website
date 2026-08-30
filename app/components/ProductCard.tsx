import Link from "next/link";
import { categoryLabels, Product, productImage } from "../data/products";

export function ProductCard({ item, index = 0 }: { item: Product; index?: number }) {
  return (
    <Link
      className="product-card"
      href={`/products/${item.slug}`}
      data-reveal
      style={{ "--delay": `${Math.min(index % 8, 7) * 45}ms` } as React.CSSProperties}
    >
      <div className="product-card__media">
        {/* Catalogue-rendered imagery is intentionally kept as a regular img for portable Node hosting. */}
        <img src={productImage(item.model)} alt={`${item.model} outdoor luminaire`} loading="eager" />
        <span className="product-card__arrow" aria-hidden="true">↗</span>
      </div>
      <div className="product-card__body">
        <span className="eyebrow">{categoryLabels[item.category]}</span>
        <h3>{item.model}</h3>
        <div className="product-card__meta">
          <span>{item.wattage}</span>
          <span>{item.efficacy}</span>
        </div>
      </div>
    </Link>
  );
}
