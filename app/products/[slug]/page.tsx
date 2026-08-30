import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "../../components/ProductCard";
import {
  categoryLabels,
  getProduct,
  productImage,
  products,
  sharedSpecifications,
} from "../../data/products";

export function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getProduct(slug);
  if (!item) return {};
  return {
    title: item.model,
    description: `${item.model} ${categoryLabels[item.category].toLowerCase()} luminaire by WJY Lighting.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getProduct(slug);
  if (!item) notFound();

  const related = products.filter((candidate) => candidate.category === item.category && candidate.slug !== item.slug).slice(0, 3);
  const isStreet = item.category === "street";
  const description = isStreet
    ? "A high-performance road luminaire with precision optics, robust die-cast construction and project-ready controls. Designed for uniform distribution, safe maintenance and long service life."
    : item.category === "solar"
      ? "An autonomous outdoor luminaire pairing a contemporary post-top form with integrated solar performance for landscapes and public spaces where simple installation matters."
      : "A contemporary garden and post-top luminaire engineered for visual comfort, uniform illumination and flexible project integration across landscapes and public spaces.";

  return (
    <>
      <section className="product-hero">
        <div className="product-hero__copy" data-reveal>
          <Link className="back-link" href="/catalogue">← Product catalogue</Link>
          <p className="kicker">{categoryLabels[item.category]}</p>
          <h1>{item.model}</h1>
          <p className="product-intro">{description}</p>
          <div className="product-quick-specs">
            <div><span>Power</span><strong>{item.wattage}</strong></div>
            <div><span>Performance</span><strong>{item.efficacy}</strong></div>
            <div><span>Protection</span><strong>IP66 · IK08</strong></div>
          </div>
        </div>
        <div className="product-hero__media" data-reveal>
          <img src={productImage(item.model)} alt={`${item.model} product views`} />
          <span>Catalogue reference · p.{String(item.page).padStart(2, "0")}</span>
        </div>
      </section>

      <section className="section product-detail-section">
        <div className="detail-lead" data-reveal>
          <p className="kicker">Engineered details</p>
          <h2>Performance with a considered silhouette.</h2>
          <p>
            High-transmission optics support visual comfort and uniform illumination. UV-resistant powder coating,
            stainless-steel fasteners and optional surge protection prepare the luminaire for demanding outdoor use.
          </p>
        </div>
        <div className="spec-panel" data-reveal>
          <div><span>Model</span><strong>{item.model}</strong></div>
          <div><span>Wattage</span><strong>{item.wattage}</strong></div>
          <div><span>Dimensions</span><strong>{item.size}</strong></div>
          {Object.entries(sharedSpecifications).map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
      </section>

      <section className="section related-section">
        <div className="section-heading section-heading--row" data-reveal>
          <div><p className="kicker">Keep exploring</p><h2>Related luminaires</h2></div>
          <Link className="text-link text-link--dark" href="/catalogue">All products <span>↗</span></Link>
        </div>
        <div className="product-grid">
          {related.map((relatedItem, index) => <ProductCard item={relatedItem} index={index} key={relatedItem.slug} />)}
        </div>
      </section>
    </>
  );
}
