import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "How Snoutly collects, uses, and protects information from visitors.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <div className="category-header">
        <div className="wrap">
          <p className="hero-eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p>Last updated: July 2026</p>
        </div>
      </div>

      <section className="section" style={{ borderBottom: "none" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="article-body">
            <p>
              This policy explains what information Snoutly collects when you visit
              the site, how it&apos;s used, and the choices available to you.
            </p>

            <h2>Information we collect</h2>
            <p>
              We collect standard technical information automatically when you visit,
              including your approximate location (based on IP address), browser type,
              device type, pages visited, and time spent on the site. If you use the
              search feature, we process the terms you search for in order to return
              results.
            </p>
            <p>
              We don&apos;t require account creation to read Snoutly, so we don&apos;t
              collect names, email addresses, or other personal identifiers unless you
              choose to provide them by contacting us directly.
            </p>

            <h2>Cookies and advertising</h2>
            <p>
              Snoutly displays ads served through Google AdSense. Google and its
              advertising partners use cookies to serve ads based on your visits to
              this and other websites. You can opt out of personalized advertising by
              visiting Google&apos;s{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                Ads Settings
              </a>
              , or through the Digital Advertising Alliance&apos;s{" "}
              <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
                WebChoices tool
              </a>{" "}
              for participating third-party vendors generally.
            </p>
            <p>
              We also use standard analytics cookies to understand which entries are
              read most and how visitors navigate the site, so we know what to write
              more of.
            </p>

            <h2>How we use information</h2>
            <p>
              Information collected is used to operate and improve the site, serve
              relevant advertising, and understand which content is useful to readers.
              We don&apos;t sell personal information to third parties.
            </p>

            <h2>Children&apos;s privacy</h2>
            <p>
              Snoutly is not directed at children under 13, and we don&apos;t knowingly
              collect personal information from children.
            </p>

            <h2>Your rights</h2>
            <p>
              Depending on where you live, you may have rights to access, correct, or
              delete personal information we hold, or to object to certain processing.
              To make a request, use the <a href="/contact">contact page</a>.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The date at the top of this
              page reflects the most recent revision.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent through the{" "}
              <a href="/contact">contact page</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
