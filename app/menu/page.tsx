import { Footer } from "@/app/components/Footer";
import { LinkButton } from "@/app/components/LinkButton";
import { MenuCards } from "@/app/components/MenuCards";
import { NavBar } from "@/app/components/NavBar";
import { PageHeader } from "@/app/components/PageHeader";

export default function MenuPage() {
  return (
    <main className="bg-[#fff7ed] text-[#24150f]">
      <NavBar variant="solid" />
      <PageHeader
        eyebrow="Full menu"
        title="Akara packs, breakfast sides, and no confusion."
        description="Choose from smoky akara packs, pap, Agege bread, custard, pepper sauce, moin moin, and zobo. Prices are placeholders for the MVP and easy to update later."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/order">Order from this menu</LinkButton>
          <LinkButton href="/contact" tone="green">
            Ask on WhatsApp
          </LinkButton>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <MenuCards cta />
      </section>
      <Footer />
    </main>
  );
}
