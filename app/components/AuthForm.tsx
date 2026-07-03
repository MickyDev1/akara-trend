"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MockUser,
  SESSION_STORAGE_KEY,
  USERS_STORAGE_KEY,
} from "@/app/lib/auth";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

type AuthErrors = {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
};

function readUsers(): MockUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(USERS_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as MockUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: MockUser[]) {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AuthErrors>({});

  const content = useMemo(
    () =>
      isSignup
        ? {
            eyebrow: "Join the breakfast queue",
            title: "Create your smoky account",
            description:
              "Mock signup for the MVP. Your details stay in this browser only.",
            submit: "Create account",
            switchPrompt: "Already have an account?",
            switchLabel: "Log in",
            switchHref: "/login",
          }
        : {
            eyebrow: "Welcome back",
            title: "Log in for quick ordering",
            description:
              "Use the account you created on this device. No backend is connected yet.",
            submit: "Log in",
            switchPrompt: "New to Smoky Akara?",
            switchLabel: "Create account",
            switchHref: "/signup",
          },
    [isSignup],
  );

  function validate() {
    const nextErrors: AuthErrors = {};

    if (isSignup && name.trim().length < 2) {
      nextErrors.name = "Add a name with at least 2 characters.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (password.length < 6) {
      nextErrors.password = "Password should be at least 6 characters.";
    }

    return nextErrors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (isSignup) {
      const existingUser = users.find((user) => user.email === normalizedEmail);

      if (existingUser) {
        setErrors({
          form: "That email already has a mock account. Try logging in instead.",
        });
        return;
      }

      const user = {
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      saveUsers([...users, user]);
      window.localStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({ name: user.name, email: user.email }),
      );
      window.location.href = "/";
      return;
    }

    const matchingUser = users.find(
      (user) =>
        user.email === normalizedEmail && user.password === password,
    );

    if (!matchingUser) {
      setErrors({
        form: "No matching mock account found on this browser.",
      });
      return;
    }

    window.localStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({ name: matchingUser.name, email: matchingUser.email }),
    );
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#fff7ed] text-[#24150f]">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-5 py-8 md:grid-cols-[0.95fr_1.05fr] md:px-8">
        <Link
          href="/"
          className="absolute left-5 top-5 rounded-[8px] border border-[#6f3c1f]/20 bg-white/70 px-3 py-2 text-sm font-semibold text-[#442513] shadow-sm backdrop-blur transition hover:bg-white md:left-8 md:top-8"
        >
          Smoky Akara
        </Link>

        <div className="hidden rounded-[8px] bg-[#2f1a10] p-8 text-[#fff7ed] shadow-2xl shadow-[#6f3c1f]/20 md:block">
          <p className="text-sm font-bold uppercase text-[#fbbf24]">
            Fresh from the pan
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[1.02]">
            Akara that logs you in before hunger logs you out.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[#fef3c7]">
            Keep a test account for faster MVP demos, then jump back to the
            order form and send your exact craving through WhatsApp.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {["No payment yet", "Local only", "Fast demo"].map((item) => (
              <div
                key={item}
                className="rounded-[8px] border border-[#fbbf24]/20 bg-white/10 p-3 text-sm font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-20 rounded-[8px] border border-[#6f3c1f]/15 bg-white p-5 shadow-xl shadow-[#92400e]/10 sm:p-8 md:mt-0"
        >
          <p className="text-sm font-bold uppercase text-[#c2410c]">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#24150f] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#6f3c1f]">
            {content.description}
          </p>

          {errors.form ? (
            <p className="mt-5 rounded-[8px] border border-[#dc2626]/20 bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b91c1c]">
              {errors.form}
            </p>
          ) : null}

          <div className="mt-6 grid gap-4">
            {isSignup ? (
              <label className="grid gap-2 text-sm font-semibold text-[#442513]">
                Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-12 rounded-[8px] border border-[#6f3c1f]/20 bg-[#fffaf3] px-4 text-base outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]"
                  placeholder="Your breakfast name"
                />
                {errors.name ? (
                  <span className="text-xs font-bold text-[#b91c1c]">
                    {errors.name}
                  </span>
                ) : null}
              </label>
            ) : null}

            <label className="grid gap-2 text-sm font-semibold text-[#442513]">
              Email
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-[8px] border border-[#6f3c1f]/20 bg-[#fffaf3] px-4 text-base outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]"
                placeholder="you@example.com"
                type="email"
              />
              {errors.email ? (
                <span className="text-xs font-bold text-[#b91c1c]">
                  {errors.email}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[#442513]">
              Password
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 rounded-[8px] border border-[#6f3c1f]/20 bg-[#fffaf3] px-4 text-base outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]"
                placeholder="At least 6 characters"
                type="password"
              />
              {errors.password ? (
                <span className="text-xs font-bold text-[#b91c1c]">
                  {errors.password}
                </span>
              ) : null}
            </label>
          </div>

          <button
            type="submit"
            className="mt-7 h-12 w-full rounded-[8px] bg-[#16a34a] px-5 text-base font-black text-white shadow-lg shadow-[#16a34a]/20 transition hover:-translate-y-0.5 hover:bg-[#15803d] focus:outline-none focus:ring-4 focus:ring-[#bbf7d0]"
          >
            {content.submit}
          </button>

          <p className="mt-5 text-center text-sm text-[#6f3c1f]">
            {content.switchPrompt}{" "}
            <Link
              href={content.switchHref}
              className="font-black text-[#c2410c] underline decoration-[#fdba74] underline-offset-4"
            >
              {content.switchLabel}
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
