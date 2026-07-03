export const WHATSAPP_NUMBER = "2348000000000";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Order", href: "/order" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Smoky Akara, I want to order akara. What is fresh today?";

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@smokyakara",
    href: "https://instagram.com/smokyakara",
    tone: "from-[#f97316] to-[#db2777]",
  },
  {
    name: "TikTok",
    handle: "@smokyakara",
    href: "https://www.tiktok.com/@smokyakara",
    tone: "from-[#111827] to-[#0f766e]",
  },
  {
    name: "X / Twitter",
    handle: "@smokyakara",
    href: "https://x.com/smokyakara",
    tone: "from-[#111827] to-[#475569]",
  },
  {
    name: "Facebook",
    handle: "Smoky Akara",
    href: "https://facebook.com/smokyakara",
    tone: "from-[#2563eb] to-[#16a34a]",
  },
] as const;

export const PACKS = [
  {
    id: "small",
    name: "Small Chop",
    count: "6 smoky balls",
    price: 1500,
    note: "For one focused hustler.",
  },
  {
    id: "medium",
    name: "Group Chat Pack",
    count: "12 smoky balls",
    price: 2800,
    note: "Enough to stop the arguments.",
  },
  {
    id: "large",
    name: "Soft Life Tray",
    count: "24 smoky balls",
    price: 5200,
    note: "For office gist, studio sessions, and serious cravings.",
  },
] as const;

export const SIDES = [
  { id: "pap", name: "Pap", price: 800 },
  { id: "bread", name: "Agege bread", price: 900 },
  { id: "custard", name: "Custard", price: 1000 },
  { id: "pepper", name: "Pepper sauce", price: 400 },
  { id: "moin-moin", name: "Moin moin", price: 1200 },
  { id: "zobo", name: "Cold zobo", price: 700 },
] as const;

export const DELIVERY_FEE = 1500;

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
