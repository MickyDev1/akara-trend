import { SOCIAL_LINKS } from "@/app/lib/brand";

type SocialLinksProps = {
  compact?: boolean;
};

export function SocialLinks({ compact = false }: SocialLinksProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className={`rounded-[8px] bg-gradient-to-br ${social.tone} p-5 text-white shadow-lg shadow-black/20 transition hover:-translate-y-1`}
        >
          <span className="text-sm font-black uppercase opacity-80">
            {social.name}
          </span>
          <span className={compact ? "mt-5 block text-xl font-black" : "mt-10 block text-2xl font-black"}>
            {social.handle}
          </span>
          <span className="mt-2 block text-sm font-semibold opacity-85">
            Follow for batches, banter, and breakfast proof.
          </span>
        </a>
      ))}
    </div>
  );
}
