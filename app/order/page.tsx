import { Footer } from "@/app/components/Footer";
import { NavBar } from "@/app/components/NavBar";
import { OrderForm } from "@/app/components/OrderForm";
import { PageHeader } from "@/app/components/PageHeader";

export default function OrderPage() {
  return (
    <main className="bg-white text-[#24150f]">
      <NavBar variant="solid" />
      <PageHeader
        eyebrow="Order"
        title="Build your smoky akara order."
        description="Pick a pack, add the breakfast extras, choose delivery or pickup, then send a pre-filled WhatsApp order. No payment processing yet."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <OrderForm />
      </section>
      <Footer />
    </main>
  );
}
