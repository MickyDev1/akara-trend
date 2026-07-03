import { LinkButton } from "@/app/components/LinkButton";
import { formatNaira, PACKS, SIDES } from "@/app/lib/brand";

type MenuCardsProps = {
  showSides?: boolean;
  cta?: boolean;
};

export function MenuCards({ showSides = true, cta = false }: MenuCardsProps) {
  return (
    <div className="grid gap-8">
      <div className="grid gap-3 md:grid-cols-3">
        {PACKS.map((pack) => (
          <article
            key={pack.id}
            className="rounded-[8px] border border-[#6f3c1f]/15 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#f97316]/50 hover:shadow-lg"
          >
            <span className="text-sm font-black uppercase text-[#c2410c]">
              {pack.count}
            </span>
            <h3 className="mt-3 text-2xl font-black text-[#24150f]">
              {pack.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6f3c1f]">{pack.note}</p>
            <p className="mt-5 text-xl font-black text-[#166534]">
              {formatNaira(pack.price)}
            </p>
          </article>
        ))}
      </div>

      {showSides ? (
        <div className="rounded-[8px] border border-[#6f3c1f]/15 bg-[#fffaf3] p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase text-[#c2410c]">
                Add-ons
              </p>
              <h3 className="mt-2 text-2xl font-black text-[#24150f]">
                Make it a proper breakfast.
              </h3>
            </div>
            {cta ? <LinkButton href="/order" tone="green">Start order</LinkButton> : null}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SIDES.map((side) => (
              <div
                key={side.id}
                className="flex items-center justify-between rounded-[8px] border border-[#6f3c1f]/10 bg-white px-4 py-3"
              >
                <span className="font-black text-[#442513]">{side.name}</span>
                <span className="font-black text-[#166534]">
                  {formatNaira(side.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
