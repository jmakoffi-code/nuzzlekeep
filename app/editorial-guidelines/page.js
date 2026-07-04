import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Editorial Guidelines",
  description: "How Nuzzlekeep researches, writes, and updates its entries.",
};

export default function EditorialGuidelinesPage() {
  return (
    <>
      <Header />

      <div className="category-header">
        <div className="wrap">
          <p className="hero-eyebrow">Editorial</p>
          <h1>Editorial guidelines</h1>
        </div>
      </div>

      <section className="section" style={{ borderBottom: "none" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="article-body">
            <h2>What we cover</h2>
            <p>
              Everyday, practical pet care: training, behavior, grooming, and general
              wellness. We don&apos;t cover diagnosis or treatment of specific medical
              conditions. Anything that sounds like it needs a vet gets pointed to a
              vet, not answered in an entry.
            </p>

            <h2>How entries are researched</h2>
            <p>
              Entries are written from established, widely-accepted care practices
              rather than a single source. Where there&apos;s genuine disagreement among
              trainers or professionals on a method, we try to say so rather than
              presenting one approach as the only correct one.
            </p>

            <h2>Updates and corrections</h2>
            <p>
              Guidance changes over time, and entries get revised when it does. Each
              entry shows the month it was last updated. If you spot something
              outdated or incorrect, let us know through the{" "}
              <a href="/contact">contact page</a> and we&apos;ll look into it.
            </p>

            <h2>Advertising and independence</h2>
            <p>
              Nuzzlekeep is supported by display advertising. Ad placement never
              influences which topics we cover or what an entry recommends. We don&apos;t
              accept payment to feature specific products or brands within an entry.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
