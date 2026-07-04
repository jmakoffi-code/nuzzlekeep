const SITE_URL = "https://nuzzlekeep.com";

function parseMinutes(readTime) {
  const match = /(\d+)/.exec(readTime || "");
  return match ? parseInt(match[1], 10) : null;
}

export function buildHowToSchema(article) {
  if (!article.stepList?.length) return null;

  const minutes = parseMinutes(article.readTime);

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: article.title,
    description: article.excerpt,
    totalTime: minutes ? `PT${minutes}M` : undefined,
    step: article.stepList.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.body,
      url: `${SITE_URL}/article/${article.slug}#step-${i + 1}`,
    })),
  };
}

export function buildFaqSchema(article) {
  if (!article.faqs?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function buildArticleSchema(article, categoryLabel) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    articleSection: categoryLabel,
    url: `${SITE_URL}/article/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Nuzzlekeep",
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
