import { Footer } from "@/app/components/Footer";
import { LinkButton } from "@/app/components/LinkButton";
import { NavBar } from "@/app/components/NavBar";
import { PageHeader } from "@/app/components/PageHeader";
import { SocialLinks } from "@/app/components/SocialLinks";
import {
  createWhatsAppLink,
  DEFAULT_WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER,
} from "@/app/lib/brand";

const whatsappLink = createWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE);

export default function ContactPage() {
  return (
    <main className="bg-[#fff7ed] text-[#24150f]">
      <NavBar variant="solid" />
      <PageHeader
        eyebrow="Contact Us"
        title="Talk to the akara desk."
        description="Ask about fresh batches, pickup timing, delivery areas, bulk trays, or social collaborations. WhatsApp is the main contact channel for this MVP."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href={whatsappLink} tone="green" external>
            Message on WhatsApp
          </LinkButton>
          <LinkButton href="/order" tone="cream">
            Place an order
          </LinkButton>
        </div>
      </PageHeader>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[8px] border border-[#6f3c1f]/15 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase text-[#c2410c]">
            Basic info
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#24150f]">
            Reach Smoky Akara
          </h2>
          <div className="mt-6 grid gap-3 text-sm font-bold text-[#442513]">
            <p className="rounded-[8px] bg-[#fff7ed] p-4">
              WhatsApp placeholder: +{WHATSAPP_NUMBER}
            </p>
            <p className="rounded-[8px] bg-[#fff7ed] p-4">
              Pickup area: Lagos placeholder location
            </p>
            <p className="rounded-[8px] bg-[#fff7ed] p-4">
              Hours: Morning batches and custom tray requests
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase text-[#c2410c]">
            Social media
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight text-[#24150f]">
            Follow for batch alerts and breakfast banter.
          </h2>
          <div className="mt-6">
            <SocialLinks compact />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
