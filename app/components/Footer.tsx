import { createWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE, SOCIAL_LINKS } from "@/app/lib/brand";

const whatsappLink = createWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE);

export function Footer() {
  return (
    <footer className="bg-[#fff7ed] px-5 py-8 text-[#442513] md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 border-t border-[#6f3c1f]/15 pt-6 md:flex-row md:items-center">
        <div>
          <p className="text-xl font-black text-[#24150f]">Smoky Akara</p>
          <p className="mt-1 text-sm font-semibold">
            Placeholder MVP. Replace links, prices, and phone number before
            launch.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-[8px] bg-[#16a34a] px-4 py-3 text-sm font-black text-white transition hover:bg-[#15803d]"
          >
            WhatsApp
          </a>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[8px] border border-[#6f3c1f]/15 bg-white px-4 py-3 text-sm font-black transition hover:border-[#f97316]"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
