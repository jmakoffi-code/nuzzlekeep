import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Snoutly.",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <div className="category-header">
        <div className="wrap">
          <p className="hero-eyebrow">Contact</p>
          <h1>Get in touch</h1>
        </div>
      </div>

      <section className="section" style={{ borderBottom: "none" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="article-body">
            <p>
              Spotted something wrong in an entry, have a topic you&apos;d like covered,
              or a question about the site? Email us directly and we&apos;ll get back to
              you.
            </p>
            <p>
              <a href="mailto:hello@snoutlypet.com" style={{ fontSize: 19 }}>
                hello@snoutlypet.com
              </a>
            </p>
            <p>
              For privacy-related requests, see our{" "}
              <a href="/privacy">Privacy Policy</a> for details on how to reach us
              about your data.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
