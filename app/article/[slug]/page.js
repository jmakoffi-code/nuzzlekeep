import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import ShareBar from "@/components/ShareBar";
import {
  articles,
  getArticleBySlug,
  getCategoryBySlug,
  getRelatedArticles,
} from "@/lib/articles";
import {
  buildHowToSchema,
  buildFaqSchema,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategoryBySlug(article.category);
  const related = getRelatedArticles(article);

  const howToSchema = buildHowToSchema(article);
  const faqSchema = buildFaqSchema(article);
  const articleSchema = howToSchema ? null : buildArticleSchema(article, category?.label);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Snoutly", url: "https://snoutlypet.com" },
    { name: category?.label || "Category", url: `https://snoutlypet.com/category/${article.category}` },
    { name: article.title, url: `https://snoutlypet.com/article/${article.slug}` },
  ]);

  return (
    <>
      {howToSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      ) : null}
      {articleSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      ) : null}
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header activeCategory={article.category} />

      <div className="article-header">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">Snoutly</Link> / <Link href={`/category/${article.category}`}>{category?.label}</Link> / {article.tag}
          </p>
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="entry-stamp">№ {article.entryNo}</span>
            {article.steps ? <span>{article.steps} steps</span> : null}
            <span>{article.readTime}</span>
            {article.difficulty ? <span>Difficulty: {article.difficulty}</span> : null}
            <span>Updated {article.updated}</span>
          </div>
        </div>
      </div>

      <div className="article-layout">
        <div className="article-body">
          <p
            style={{ fontSize: 19, color: "var(--ink)" }}
            dangerouslySetInnerHTML={{ __html: article.intro }}
          />

          <div style={{ margin: "28px 0" }}>
            <AdSlot type="in-content" />
          </div>

          {article.whatYouNeed ? (
            <>
              <h2>What you&apos;ll need</h2>
              <p>{article.whatYouNeed}</p>
            </>
          ) : null}

          {article.sections?.length
            ? article.sections.map((section, i) => (
                <div key={i}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
              ))
            : null}

          {article.stepList?.length ? (
            <>
              <h2>Steps</h2>
              <ol className="step-list">
                {article.stepList.map((step, i) => (
                  <li key={i} id={`step-${i + 1}`}>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          ) : null}

          {article.callout ? (
            <div className="callout">
              <strong>{article.callout.title}</strong>
              {article.callout.body}
            </div>
          ) : null}

          {article.extra ? (
            <>
              <h2>{article.extra.heading}</h2>
              <p>{article.extra.body}</p>
            </>
          ) : null}

          {article.faqs?.length ? (
            <>
              <h2>Frequently asked questions</h2>
              {article.faqs.map((faq, i) => (
                <details className="faq-item" key={i}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </>
          ) : null}
        </div>

        <aside className="sidebar">
          <ShareBar slug={article.slug} title={article.title} excerpt={article.excerpt} />

          <AdSlot type="sidebar" />

          {article.quickFacts?.length ? (
            <div className="related-box">
              <h4>Quick facts</h4>
              <ul>
                {article.quickFacts.map((fact, i) => (
                  <li key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ color: "var(--slate)" }}>{fact.label}</span>
                    <strong style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600 }}>{fact.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="related-box">
              <h4>Related entries</h4>
              <ul>
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/article/${r.slug}`}>{r.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <AdSlot type="sidebar" />
        </aside>
      </div>

      <Footer />
    </>
  );
}
