"use client";

import { useMemo, useState } from "react";
import {
  createWhatsAppLink,
  DELIVERY_FEE,
  formatNaira,
  PACKS,
  SIDES,
  WHATSAPP_NUMBER,
} from "@/app/lib/brand";
import { useMockSession } from "@/app/lib/useMockSession";

type DeliveryMode = "delivery" | "pickup";

type OrderErrors = {
  name?: string;
  phone?: string;
  address?: string;
};

export function OrderForm() {
  const session = useMockSession();
  const [packId, setPackId] = useState<(typeof PACKS)[number]["id"]>("medium");
  const [quantity, setQuantity] = useState(1);
  const [selectedSides, setSelectedSides] = useState<string[]>(["pepper"]);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("delivery");
  const [nameOverride, setNameOverride] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<OrderErrors>({});
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const name = nameOverride ?? session?.name ?? "";

  const selectedPack = useMemo(
    () => PACKS.find((pack) => pack.id === packId) ?? PACKS[1],
    [packId],
  );

  const selectedSideItems = useMemo(
    () => SIDES.filter((side) => selectedSides.includes(side.id)),
    [selectedSides],
  );

  const subtotal = useMemo(() => {
    const packTotal = selectedPack.price * quantity;
    const sideTotal = selectedSideItems.reduce(
      (total, side) => total + side.price,
      0,
    );
    return packTotal + sideTotal;
  }, [quantity, selectedPack.price, selectedSideItems]);

  const total = subtotal + (deliveryMode === "delivery" ? DELIVERY_FEE : 0);

  const orderMessage = useMemo(() => {
    const sideText =
      selectedSideItems.length > 0
        ? selectedSideItems
            .map((side) => `${side.name} (${formatNaira(side.price)})`)
            .join(", ")
        : "No sides";

    return [
      "Hi Smoky Akara, I want to place an order.",
      "",
      `Name: ${name || "Not provided"}`,
      `Phone: ${phone || "Not provided"}`,
      `Pack: ${selectedPack.name} - ${selectedPack.count}`,
      `Quantity: ${quantity}`,
      `Sides: ${sideText}`,
      `Fulfilment: ${deliveryMode}`,
      deliveryMode === "delivery"
        ? `Delivery address: ${address || "Not provided"}`
        : "Pickup: I will pick it up",
      notes ? `Notes: ${notes}` : "Notes: None",
      `Estimated total: ${formatNaira(total)}`,
    ].join("\n");
  }, [
    address,
    deliveryMode,
    name,
    notes,
    phone,
    quantity,
    selectedPack.count,
    selectedPack.name,
    selectedSideItems,
    total,
  ]);

  const orderWhatsAppLink = createWhatsAppLink(orderMessage);

  function validateOrder() {
    const nextErrors: OrderErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Add your name so we know who is ordering.";
    }

    if (!/^[+\d][\d\s-]{6,}$/.test(phone.trim())) {
      nextErrors.phone = "Add a reachable phone number.";
    }

    if (deliveryMode === "delivery" && address.trim().length < 8) {
      nextErrors.address = "Add a delivery address or choose pickup.";
    }

    return nextErrors;
  }

  function handleSideToggle(sideId: string) {
    setSelectedSides((currentSides) =>
      currentSides.includes(sideId)
        ? currentSides.filter((id) => id !== sideId)
        : [...currentSides, sideId],
    );
  }

  function handleSendOrder() {
    setHasTriedSubmit(true);
    const nextErrors = validateOrder();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    window.open(orderWhatsAppLink, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-sm font-black uppercase text-[#c2410c]">Order</p>
        <h2 className="mt-3 text-4xl font-black leading-tight text-[#24150f] sm:text-5xl">
          Build your akara run.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#6f3c1f]">
          Fill the essentials, review the total, then send the full order to
          WhatsApp. No payments or sensitive customer storage in this MVP.
        </p>

        <div className="mt-8 grid gap-6">
          <fieldset>
            <legend className="text-sm font-black uppercase text-[#442513]">
              Pack size
            </legend>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {PACKS.map((pack) => (
                <label
                  key={pack.id}
                  className={`cursor-pointer rounded-[8px] border p-4 transition hover:-translate-y-0.5 ${
                    packId === pack.id
                      ? "border-[#f97316] bg-[#ffedd5]"
                      : "border-[#6f3c1f]/15 bg-[#fffaf3]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      checked={packId === pack.id}
                      onChange={() => setPackId(pack.id)}
                      name="pack"
                      type="radio"
                      className="h-5 w-5 accent-[#f97316]"
                    />
                    <span className="font-black text-[#24150f]">
                      {pack.name}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-[#6f3c1f]">
                    {pack.count} - {formatNaira(pack.price)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="text-sm font-black uppercase text-[#442513]">
              Quantity
            </label>
            <div className="mt-3 inline-flex overflow-hidden rounded-[8px] border border-[#6f3c1f]/20 bg-[#fffaf3]">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="h-12 w-12 text-xl font-black text-[#c2410c] transition hover:bg-[#ffedd5]"
                aria-label="Reduce quantity"
              >
                -
              </button>
              <output className="grid h-12 w-16 place-items-center border-x border-[#6f3c1f]/20 text-lg font-black">
                {quantity}
              </output>
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.min(20, value + 1))}
                className="h-12 w-12 text-xl font-black text-[#166534] transition hover:bg-[#dcfce7]"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-black uppercase text-[#442513]">
              Optional sides
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {SIDES.map((side) => {
                const isSelected = selectedSides.includes(side.id);
                return (
                  <label
                    key={side.id}
                    className={`flex cursor-pointer items-center justify-between rounded-[8px] border p-4 transition hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-[#16a34a] bg-[#f0fdf4]"
                        : "border-[#6f3c1f]/15 bg-[#fffaf3]"
                    }`}
                  >
                    <span>
                      <span className="block font-black text-[#24150f]">
                        {side.name}
                      </span>
                      <span className="text-sm font-semibold text-[#6f3c1f]">
                        {formatNaira(side.price)}
                      </span>
                    </span>
                    <input
                      checked={isSelected}
                      onChange={() => handleSideToggle(side.id)}
                      type="checkbox"
                      className="h-5 w-5 accent-[#16a34a]"
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-black uppercase text-[#442513]">
              Delivery option
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(["delivery", "pickup"] as DeliveryMode[]).map((mode) => (
                <label
                  key={mode}
                  className={`rounded-[8px] border p-4 transition ${
                    deliveryMode === mode
                      ? "border-[#f97316] bg-[#ffedd5]"
                      : "border-[#6f3c1f]/15 bg-[#fffaf3]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      checked={deliveryMode === mode}
                      onChange={() => setDeliveryMode(mode)}
                      name="deliveryMode"
                      type="radio"
                      className="h-5 w-5 accent-[#f97316]"
                    />
                    <span className="font-black capitalize text-[#24150f]">
                      {mode}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-[#6f3c1f]">
                    {mode === "delivery"
                      ? `${formatNaira(DELIVERY_FEE)} estimated dispatch fee`
                      : "Come through when the batch is ready"}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-[#442513]">
              Name
              <input
                value={name}
                onChange={(event) => setNameOverride(event.target.value)}
                className="h-12 rounded-[8px] border border-[#6f3c1f]/20 bg-[#fffaf3] px-4 text-base outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]"
                placeholder="Your name"
              />
              {hasTriedSubmit && errors.name ? (
                <span className="text-xs font-black text-[#b91c1c]">
                  {errors.name}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#442513]">
              Phone number
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-12 rounded-[8px] border border-[#6f3c1f]/20 bg-[#fffaf3] px-4 text-base outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]"
                placeholder="+234..."
              />
              {hasTriedSubmit && errors.phone ? (
                <span className="text-xs font-black text-[#b91c1c]">
                  {errors.phone}
                </span>
              ) : null}
            </label>
          </div>

          {deliveryMode === "delivery" ? (
            <label className="grid gap-2 text-sm font-bold text-[#442513]">
              Delivery address
              <textarea
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="min-h-24 rounded-[8px] border border-[#6f3c1f]/20 bg-[#fffaf3] px-4 py-3 text-base outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]"
                placeholder="Street, area, nearest landmark"
              />
              {hasTriedSubmit && errors.address ? (
                <span className="text-xs font-black text-[#b91c1c]">
                  {errors.address}
                </span>
              ) : null}
            </label>
          ) : null}

          <label className="grid gap-2 text-sm font-bold text-[#442513]">
            Notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="min-h-20 rounded-[8px] border border-[#6f3c1f]/20 bg-[#fffaf3] px-4 py-3 text-base outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]"
              placeholder="Extra pepper, less oil, call when outside..."
            />
          </label>
        </div>
      </div>

      <aside className="h-fit rounded-[8px] border border-[#6f3c1f]/15 bg-[#fff7ed] p-5 shadow-xl shadow-[#92400e]/10 lg:sticky lg:top-24">
        <p className="text-sm font-black uppercase text-[#c2410c]">
          Order summary
        </p>
        <h3 className="mt-3 text-3xl font-black text-[#24150f]">
          {selectedPack.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#6f3c1f]">
          {selectedPack.count} x {quantity}
        </p>

        <div className="mt-6 grid gap-3 text-sm font-semibold text-[#442513]">
          <div className="flex justify-between gap-4">
            <span>Pack total</span>
            <span>{formatNaira(selectedPack.price * quantity)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>
              Sides
              <span className="block max-w-[14rem] text-xs font-bold text-[#8a4b24]">
                {selectedSideItems.length
                  ? selectedSideItems.map((side) => side.name).join(", ")
                  : "None selected"}
              </span>
            </span>
            <span>
              {formatNaira(
                selectedSideItems.reduce((sum, side) => sum + side.price, 0),
              )}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Fulfilment</span>
            <span>
              {deliveryMode === "delivery" ? formatNaira(DELIVERY_FEE) : "Pickup"}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-[#6f3c1f]/15 pt-5">
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm font-black uppercase text-[#442513]">
              Estimated total
            </span>
            <span className="text-3xl font-black text-[#166534]">
              {formatNaira(total)}
            </span>
          </div>
          <p className="mt-3 text-xs font-semibold leading-5 text-[#6f3c1f]">
            Final availability, delivery fee, and pickup timing can be confirmed
            in WhatsApp.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSendOrder}
          className="mt-6 w-full rounded-[8px] bg-[#16a34a] px-5 py-4 text-base font-black text-white shadow-lg shadow-[#16a34a]/20 transition hover:-translate-y-0.5 hover:bg-[#15803d] focus:outline-none focus:ring-4 focus:ring-[#bbf7d0]"
        >
          Send Order to WhatsApp
        </button>

        <p className="mt-4 break-words rounded-[8px] bg-white px-3 py-3 text-xs font-semibold leading-5 text-[#6f3c1f]">
          WhatsApp placeholder: +{WHATSAPP_NUMBER}. Replace it in the brand
          config when your real line is ready.
        </p>
      </aside>
    </div>
  );
}
