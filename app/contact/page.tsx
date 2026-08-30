import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact WJY Lighting about outdoor lighting products, projects and partnerships.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="contact-hero__glow" aria-hidden="true" />
        <p className="kicker" data-reveal>Start a conversation</p>
        <h1 data-reveal>Let&apos;s make the night work better.</h1>
        <p data-reveal>
          Talk with WJY about product specifications, project requirements,
          OEM partnerships or your next outdoor lighting application.
        </p>
      </section>

      <section className="section contact-section">
        <div className="contact-section__intro" data-reveal>
          <p className="kicker">Contact WJY</p>
          <h2>Choose the channel that works for you.</h2>
          <p>
            Send us an email for detailed enquiries, or connect through
            WhatsApp for a quick conversation.
          </p>
        </div>

        <div className="contact-grid">
          <a className="contact-card" href="mailto:contact@wjyco.com" data-reveal>
            <span className="contact-card__number">01</span>
            <div>
              <span className="eyebrow">Email</span>
              <h2>contact@wjyco.com</h2>
              <span className="contact-card__action">Write to us <span aria-hidden="true">↗</span></span>
            </div>
          </a>

          <a
            className="contact-card contact-card--whatsapp"
            href="https://wa.me/wjyco"
            target="_blank"
            rel="noreferrer"
            data-reveal
          >
            <span className="contact-card__number">02</span>
            <div>
              <span className="eyebrow">WhatsApp</span>
              <h2>wjyco</h2>
              <span className="contact-card__action">Open WhatsApp <span aria-hidden="true">↗</span></span>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
