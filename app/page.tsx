import Link from "next/link";
import { ProductCard } from "./components/ProductCard";
import { categoryLabels, productImage, products } from "./data/products";

const featured = products.filter((item) => item.featured).slice(0, 6);

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__image" aria-hidden="true" />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__content">
          <p className="kicker" data-reveal>Outdoor lighting · Est. 1996</p>
          <h1 data-reveal>Light that belongs <em>to the place.</em></h1>
          <p className="hero__lede" data-reveal>
            Durable, efficient luminaires shaped for streets, parks, residential precincts and the public realm.
          </p>
          <div className="hero__actions" data-reveal>
            <Link className="button button--light" href="/catalogue">Explore 40 product families <span>↗</span></Link>
            <a className="text-link" href="#company">Meet WJY <span>↓</span></a>
          </div>
        </div>
        <div className="hero__stats">
          <div><strong>30+</strong><span>Years of experience</span></div>
          <div><strong>3</strong><span>Product collections</span></div>
          <div><strong>OEM</strong><span>Design & production</span></div>
        </div>
      </section>

      <section className="section company-section" id="company">
        <div className="section-heading" data-reveal>
          <p className="kicker">Who we are</p>
          <h2>From first sketch to the finished streetscape.</h2>
        </div>
        <div className="company-copy" data-reveal>
          <p>
            Changzhou Wanjiayao Lighting is an experienced outdoor lighting manufacturer specialising in product design,
            research and development, manufacturing, OEM/ODM production and project-oriented solutions.
          </p>
          <p>
            We combine functional engineering with considered industrial design to make reliable, efficient and visually
            coherent luminaires for everyday public space.
          </p>
        </div>
        <div className="capability-strip" data-reveal>
          {[
            ["01", "Design", "Product and optical development"],
            ["02", "Manufacture", "Die-cast aluminium production"],
            ["03", "Engineer", "Project-specific configuration"],
            ["04", "Deliver", "OEM / ODM partnerships"],
          ].map(([number, title, copy]) => (
            <div key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>
          ))}
        </div>
      </section>

      <section className="section collections-section">
        <div className="section-heading section-heading--row" data-reveal>
          <div><p className="kicker">Collections</p><h2>One language.<br />Three ways to light.</h2></div>
          <Link className="text-link text-link--dark" href="/catalogue">View all products <span>↗</span></Link>
        </div>
        <div className="collection-grid">
          {(["garden", "solar", "street"] as const).map((category, index) => {
            const first = products.find((item) => item.category === category)!;
            const count = products.filter((item) => item.category === category).length;
            return (
              <Link href={`/catalogue?category=${category}`} className="collection-card" key={category} data-reveal>
                <img src={productImage(first.model)} alt="" />
                <span className="collection-card__number">0{index + 1}</span>
                <div><span>{count} product families</span><h3>{categoryLabels[category]}</h3></div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-heading section-heading--row" data-reveal>
          <div><p className="kicker">Selected products</p><h2>Designed for long nights.</h2></div>
          <p className="section-note">IP66 protection · Up to 100,000 hour lifetime · Smart-control ready</p>
        </div>
        <div className="product-grid product-grid--featured">
          {featured.map((item, index) => <ProductCard item={item} index={index} key={item.slug} />)}
        </div>
      </section>

      <section className="closing-cta" data-reveal>
        <div><p className="kicker">Find your fit</p><h2>Forty ways to make the night work better.</h2></div>
        <Link className="button button--light" href="/catalogue">Browse the complete catalogue <span>↗</span></Link>
      </section>
    </>
  );
}
