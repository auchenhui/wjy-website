import type { Metadata } from "next";
import { Catalogue } from "../components/Catalogue";
import { products } from "../data/products";

export const metadata: Metadata = {
  title: "Product catalogue",
  description: "Browse WJY garden, post-top, solar and LED street lighting product families.",
};

export default function CataloguePage() {
  return (
    <>
      <section className="page-hero page-hero--catalogue">
        <p className="kicker" data-reveal>Product catalogue · 2026</p>
        <h1 data-reveal>Built for the public realm.</h1>
        <p data-reveal>Explore outdoor luminaires by application, output and form. Every product can be configured for project needs.</p>
      </section>
      <section className="section catalogue-section" id="catalogue">
        <Catalogue products={products} />
      </section>
    </>
  );
}
