"use client";

import { useMemo, useState } from "react";
import { Product } from "../data/products";
import { ProductCard } from "./ProductCard";

const filters = [
  ["all", "All products"],
  ["garden", "Garden & post-top"],
  ["solar", "Solar"],
  ["street", "Street"],
] as const;

export function Catalogue({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((item) => {
      const inCategory = filter === "all" || item.category === filter;
      const inSearch = !term || `${item.model} ${item.wattage} ${item.size}`.toLowerCase().includes(term);
      return inCategory && inSearch;
    });
  }, [filter, products, query]);

  return (
    <>
      <div className="catalogue-tools" data-reveal>
        <div className="filter-row" role="group" aria-label="Filter products">
          {filters.map(([value, label]) => (
            <button className={filter === value ? "is-active" : ""} key={value} onClick={() => setFilter(value)}>
              {label}
            </button>
          ))}
        </div>
        <label className="search-box">
          <span className="sr-only">Search product models</span>
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search model or wattage" />
        </label>
      </div>
      <div className="catalogue-count" aria-live="polite">{visible.length} product families</div>
      {visible.length ? (
        <div className="product-grid">
          {visible.map((item, index) => <ProductCard item={item} index={index} key={item.slug} />)}
        </div>
      ) : (
        <div className="empty-state">No product matches that search. Try a model number or another category.</div>
      )}
    </>
  );
}
