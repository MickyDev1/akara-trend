import Link from "next/link";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  tone?: "orange" | "green" | "cream" | "dark";
  className?: string;
  external?: boolean;
};

const tones = {
  orange:
    "bg-[#f97316] text-white shadow-lg shadow-[#f97316]/25 hover:bg-[#ea580c]",
  green:
    "bg-[#16a34a] text-white shadow-lg shadow-[#16a34a]/20 hover:bg-[#15803d]",
  cream:
    "border border-[#6f3c1f]/15 bg-[#fff7ed] text-[#442513] hover:border-[#f97316]",
  dark:
    "bg-[#24150f] text-white shadow-lg shadow-[#24150f]/15 hover:bg-[#3a2114]",
};

export function LinkButton({
  href,
  children,
  tone = "orange",
  className = "",
  external = false,
}: LinkButtonProps) {
  const buttonClass = `inline-flex min-h-12 items-center justify-center rounded-[8px] px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#fed7aa] sm:text-base ${tones[tone]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={buttonClass}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClass}>
      {children}
    </Link>
  );
}
