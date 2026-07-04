"use client";

import { useState } from "react";

export default function CopyLinkButton({ url }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail quietly,
      // the other share links still work fine.
    }
  }

  return (
    <button type="button" onClick={handleCopy} className="share-pill">
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
