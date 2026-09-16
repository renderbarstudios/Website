"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Shared lead-form submit hook. Posts a plain object as JSON to a given API
 * route and tracks loading/success/error UI states.
 */
export function useLeadForm(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function submit(payload: Record<string, string>) {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        return true;
      }
      setError(
        data.error ||
          "Something went wrong. Please try again or call (904) 431-7006.",
      );
      setStatus("error");
      return false;
    } catch {
      setError(
        "Network error. Please check your connection or call (904) 431-7006.",
      );
      setStatus("error");
      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setError("");
  }

  return { status, error, submit, reset };
}

/** Convert a form element's fields into a plain string record. */
export function formToObject(form: HTMLFormElement): Record<string, string> {
  const fd = new FormData(form);
  const obj: Record<string, string> = {};
  fd.forEach((value, key) => {
    obj[key] = typeof value === "string" ? value : "";
  });
  return obj;
}
