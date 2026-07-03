const aboutCards = [
  [
    "Akara, but internet-ready",
    "Akara is a Nigerian fried bean cake, also known as a bean fritter. Smoky Akara packages that familiar street-breakfast joy for quick WhatsApp ordering.",
  ],
  [
    "Trend-aware, not troublesome",
    "The brand nods to the youth hustle conversation with humor, but keeps the tone useful, respectful, and free from political dragging.",
  ],
  [
    "Built for sharing",
    "Fast mobile layout, direct WhatsApp ordering, and playful motion make the site work well from chats, social bios, and status updates.",
  ],
  [
    "MVP today",
    "No payments, no sensitive storage, no admin dashboard. Just a clean way to test demand and collect real customer intent.",
  ],
] as const;

export function AboutCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {aboutCards.map(([title, body]) => (
        <article
          key={title}
          className="rounded-[8px] border border-[#6f3c1f]/15 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h3 className="text-xl font-black text-[#24150f]">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#6f3c1f]">{body}</p>
        </article>
      ))}
    </div>
  );
}
