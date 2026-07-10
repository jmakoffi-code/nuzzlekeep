export default function AdSlot({ type = "in-content", label }) {
  // Ad slots are hidden until AdSense is approved and live ad units replace
  // this placeholder. Set NEXT_PUBLIC_ADS_ENABLED=true in Vercel env vars
  // once approved to bring these back / swap in real ad code.
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== "true") {
    return null;
  }

  const sizes = {
    leaderboard: "728×90 leaderboard",
    "in-content": "336×280 in-content unit",
    sidebar: "300×250 sidebar unit",
  };
  return <div className={`ad-slot ${type}`}>Advertisement — {label || sizes[type]}</div>;
}
