import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories, articles } from "@/lib/articles";

export const metadata = { title: "Entry not found" };

export default function NotFound() {
  const popular = articles.slice(0, 4);

  return (
    <>
      <Header />

      <div className="category-header">
        <div className="wrap">
          <p className="hero-eyebrow">Entry not found</p>
          <h1>This page isn&apos;t in the field guide.</h1>
          <p>
            The link might be broken, or the entry may have moved. Try one of the
            categories below, or search for what you were looking for.
          </p>
        </div>
      </div>

      <section className="section" style={{ borderBottom: "none" }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Browse a category</h2>
          </div>
          <div className="hero-species" style={{ marginBottom: 40 }}>
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="species-pill">
                {c.label}
              </Link>
            ))}
          </div>

          <div className="section-head">
            <h2>Or start with a popular entry</h2>
          </div>
          <div className="card-grid">
            {popular.map((a) => (
              <Link key={a.slug} href={`/article/${a.slug}`} className="spec-card">
                <div className="tag-row">
                  <span className="entry-no">№ {a.entryNo}</span>
                  <span>{a.tag}</span>
                </div>
                <div className="body">
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
