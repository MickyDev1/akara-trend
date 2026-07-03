import { AboutCards } from "@/app/components/AboutCards";
import { Footer } from "@/app/components/Footer";
import { LinkButton } from "@/app/components/LinkButton";
import { NavBar } from "@/app/components/NavBar";
import { PageHeader } from "@/app/components/PageHeader";

export default function AboutPage() {
  return (
    <main className="bg-[#fff7ed] text-[#24150f]">
      <NavBar variant="solid" />
      <PageHeader
        eyebrow="About"
        title="A playful akara brand for breakfast people."
        description="Smoky Akara is a trend-aware Nigerian food MVP built around akara: the beloved fried bean cake, or bean fritter, that belongs beside pap, bread, custard, and pepper sauce."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/order">Order Akara Now</LinkButton>
          <LinkButton href="/menu" tone="cream">
            View Menu
          </LinkButton>
        </div>
      </PageHeader>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[8px] bg-[#2f1a10] p-6 text-[#fff7ed] shadow-xl shadow-[#6f3c1f]/15">
          <p className="text-sm font-black uppercase text-[#fbbf24]">
            Why Smoky Akara exists
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight">
            Because small chops deserve proper product thinking.
          </h2>
          <p className="mt-5 text-sm font-semibold leading-6 text-[#fef3c7]">
            The goal is simple: make a funny, modern, shareable site that still
            behaves like a real mini ordering platform.
          </p>
        </div>
        <AboutCards />
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="rounded-[8px] border border-[#6f3c1f]/15 bg-[#fff7ed] p-6 shadow-sm">
            <p className="text-sm font-black uppercase text-[#c2410c]">
              Brand tone
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#24150f] sm:text-4xl">
              Witty, warm, culturally Nigerian, and focused on selling food.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#6f3c1f]">
              The humor is about hustle, breakfast cravings, and group-chat
              energy. It stays friendly and avoids offensive or overly political
              copy.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
