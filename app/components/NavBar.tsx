"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/app/lib/brand";
import { clearMockSession, useMockSession } from "@/app/lib/useMockSession";

type NavBarProps = {
  variant?: "overlay" | "solid";
};

export function NavBar({ variant = "solid" }: NavBarProps) {
  const pathname = usePathname();
  const session = useMockSession();
  const [isOpen, setIsOpen] = useState(false);
  const isOverlay = variant === "overlay";

  const shellClass = isOverlay
    ? "absolute left-0 right-0 top-0 z-30"
    : "sticky left-0 right-0 top-0 z-30 border-b border-[#6f3c1f]/10 bg-[#fff7ed]/95 backdrop-blur";

  const navPillClass = isOverlay
    ? "hidden items-center gap-2 rounded-[8px] bg-[#24150f]/55 p-1 text-sm font-bold text-white backdrop-blur md:flex"
    : "hidden items-center gap-2 rounded-[8px] bg-white p-1 text-sm font-bold text-[#442513] shadow-sm md:flex";

  function handleLogout() {
    clearMockSession();
    setIsOpen(false);
  }

  return (
    <header className={shellClass}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="rounded-[8px] bg-[#fff7ed]/90 px-3 py-2 text-sm font-black text-[#2f1a10] shadow-sm backdrop-blur"
          onClick={() => setIsOpen(false)}
        >
          Smoky Akara
        </Link>

        <div className={navPillClass}>
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-[8px] px-3 py-2 transition ${
                  isActive
                    ? "bg-[#f97316] text-white"
                    : isOverlay
                      ? "hover:bg-white/15"
                      : "hover:bg-[#fff7ed]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {session ? (
            <button
              onClick={handleLogout}
              className="rounded-[8px] bg-white/90 px-3 py-2 text-sm font-black text-[#c2410c] shadow-sm transition hover:bg-white"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-[8px] bg-white/90 px-3 py-2 text-sm font-black text-[#442513] shadow-sm transition hover:bg-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-[8px] bg-[#16a34a] px-3 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#15803d]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-[8px] bg-white/90 px-3 py-2 text-sm font-black text-[#442513] shadow-sm md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          Menu
        </button>
      </nav>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="mx-5 mb-4 rounded-[8px] border border-[#6f3c1f]/15 bg-white p-2 shadow-xl shadow-[#6f3c1f]/10 md:hidden"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-[8px] px-3 py-3 text-sm font-black transition ${
                  isActive
                    ? "bg-[#f97316] text-white"
                    : "text-[#442513] hover:bg-[#fff7ed]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#6f3c1f]/10 pt-2">
            {session ? (
              <button
                onClick={handleLogout}
                className="col-span-2 rounded-[8px] bg-[#fff7ed] px-3 py-3 text-sm font-black text-[#c2410c]"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-[8px] bg-[#fff7ed] px-3 py-3 text-center text-sm font-black text-[#442513]"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="rounded-[8px] bg-[#16a34a] px-3 py-3 text-center text-sm font-black text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
