import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Nuzzlekeep",
  description: "Why Nuzzlekeep exists and how we approach writing pet care guides.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <div className="category-header">
        <div className="wrap">
          <p className="hero-eyebrow">About</p>
          <h1>Why Nuzzlekeep exists</h1>
        </div>
      </div>

      <section className="section" style={{ borderBottom: "none" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="article-body">
            <p>
              Most pet care content online falls into one of two camps: a wall of text
              padded out to rank for a keyword, or a forum thread with forty conflicting
              opinions and no clear answer. Nuzzlekeep is an attempt at a third option:
              specific, numbered steps for the questions people actually type into a
              search bar, without the ten-paragraph preamble first.
            </p>

            <h2>How entries get written</h2>
            <p>
              Every entry follows the same shape on purpose: what you need, the steps in
              order, and the questions that tend to come up afterward. We&apos;d rather an
              entry be short and useful than long and impressive. If a topic genuinely
              needs more nuance, that shows up in the FAQ section rather than padding
              out the main steps.
            </p>
            <p>
              We stick to general, everyday care, the kind of thing a reasonably
              experienced owner already does at home. Anything that touches on
              diagnosing or treating a health issue points back to a vet rather than
              trying to stand in for one. A website is a poor substitute for someone who
              can actually examine your animal.
            </p>

            <h2>How the site makes money</h2>
            <p>
              Nuzzlekeep runs on display advertising. We don&apos;t accept payment to
              feature a specific product or brand inside an entry, and sponsored
              content, if we ever run any, will always be labeled clearly as such.
            </p>

            <h2>Get in touch</h2>
            <p>
              Something wrong in an entry, or a topic you&apos;d like to see covered?
              Reach out through the <a href="/contact">contact page</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
