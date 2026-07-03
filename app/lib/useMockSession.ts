"use client";

import { useMemo, useSyncExternalStore } from "react";
import { MockSession, SESSION_STORAGE_KEY } from "@/app/lib/auth";

export const SESSION_CHANGE_EVENT = "smoky-akara-session";

function getSessionSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(SESSION_STORAGE_KEY);
}

function subscribeToSession(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(SESSION_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(SESSION_CHANGE_EVENT, onStoreChange);
  };
}

function parseSession(snapshot: string | null) {
  if (!snapshot) {
    return null;
  }

  try {
    return JSON.parse(snapshot) as MockSession;
  } catch {
    return null;
  }
}

export function useMockSession() {
  const sessionSnapshot = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    () => null,
  );

  return useMemo(() => parseSession(sessionSnapshot), [sessionSnapshot]);
}

export function clearMockSession() {
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
  window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}
