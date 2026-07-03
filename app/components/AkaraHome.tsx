import Image from "next/image";
import { AboutCards } from "@/app/components/AboutCards";
import { AkaraMotion } from "@/app/components/AkaraMotion";
import { Footer } from "@/app/components/Footer";
import { LinkButton } from "@/app/components/LinkButton";
import { MenuCards } from "@/app/components/MenuCards";
import { NavBar } from "@/app/components/NavBar";
import { SocialLinks } from "@/app/components/SocialLinks";
import { createWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/app/lib/brand";

const genericWhatsAppLink = createWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE);

export function AkaraHome() {
  return (
    <main className="bg-[#fff7ed] text-[#24150f]">
      <NavBar variant="overlay" />

      <section className="relative min-h-[88svh] overflow-hidden bg-[#24150f] text-white">
        <Image
          src="/akara-hero.png"
          alt="A warm bowl of golden Nigerian akara with pap and pepper sauce"
          fill
          priority
          sizes="100vw"
          className="hero-photo object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,21,15,0.92),rgba(36,21,15,0.68)_46%,rgba(36,21,15,0.18))]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(0deg,#fff7ed,rgba(255,247,237,0))]" />
        <AkaraMotion />

        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl items-center px-5 pb-20 pt-28 md:px-8">
          <div className="max-w-3xl">
            <div className="rise-in inline-flex rounded-[8px] border border-[#fbbf24]/30 bg-[#fff7ed]/10 px-3 py-2 text-sm font-black text-[#fef3c7] backdrop-blur">
              Hot akara. Zero long story.
            </div>
            <h1 className="rise-in mt-5 max-w-3xl text-5xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              Smoky Akara for people taking the hustle seriously.
            </h1>
            <p className="rise-in mt-5 max-w-2xl text-base font-medium leading-7 text-[#ffedd5] sm:text-lg">
              Crispy outside, soft inside, and ready for the group chat. Build
              your pack, add pap or bread, then send the order straight to
              WhatsApp.
            </p>
            <div className="rise-in mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/order">Order Akara Now</LinkButton>
              <LinkButton href="/menu" tone="cream">
                View Menu
              </LinkButton>
              <LinkButton href={genericWhatsAppLink} tone="green" external>
                Message Us on WhatsApp
              </LinkButton>
            </div>

            <div className="rise-in mt-8 grid max-w-xl grid-cols-3 gap-2 text-sm font-bold text-[#fff7ed]">
              {["Fresh batches", "Pickup or delivery", "No checkout drama"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-[8px] border border-white/15 bg-white/10 px-3 py-3 backdrop-blur"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-black uppercase text-[#c2410c]">Menu</p>
          <h2 className="mt-3 max-w-xl text-4xl font-black leading-tight text-[#24150f] sm:text-5xl">
            Pick the pack that matches the hunger level.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#6f3c1f]">
            This is the quick preview. The full menu page has every pack, side,
            and the order CTA.
          </p>
          <div className="mt-6">
            <LinkButton href="/menu" tone="dark">
              Open full menu
            </LinkButton>
          </div>
        </div>

        <MenuCards showSides={false} />
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-[#c2410c]">Order</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight text-[#24150f] sm:text-5xl">
              Ready to make hunger calm down?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6f3c1f]">
              The full order page lets customers pick quantity, pack size, add
              sides, choose pickup or delivery, and send the final summary to
              WhatsApp.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/order" tone="green">
                Start full order
              </LinkButton>
              <LinkButton href="/contact" tone="cream">
                Contact Us
              </LinkButton>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#6f3c1f]/15 bg-[#fff7ed] p-5 shadow-xl shadow-[#92400e]/10">
            <p className="text-sm font-black uppercase text-[#c2410c]">
              How it works
            </p>
            <div className="mt-4 grid gap-3">
              {[
                "Choose a pack and your add-ons.",
                "Add pickup or delivery details.",
                "Send the clean order summary to WhatsApp.",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex gap-3 rounded-[8px] bg-white p-4 text-sm font-bold text-[#442513]"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f97316] text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[8px] bg-[#2f1a10] p-6 text-[#fff7ed] shadow-xl shadow-[#6f3c1f]/15">
          <p className="text-sm font-black uppercase text-[#fbbf24]">
            The concept
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            A small breakfast business with big main-character energy.
          </h2>
          <div className="mt-6">
            <LinkButton href="/about" tone="orange">
              Read the story
            </LinkButton>
          </div>
        </div>
        <AboutCards />
      </section>

      <section className="bg-[#24150f] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase text-[#fbbf24]">
                Follow the smoke
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
                Catch the drops, jokes, and fresh batch alerts.
              </h2>
            </div>
            <LinkButton href="/contact" tone="green">
              Contact Us
            </LinkButton>
          </div>

          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
