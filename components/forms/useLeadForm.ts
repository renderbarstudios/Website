"use client";

import { createElement, useCallback, useState } from "react";
import TurnstileWidget from "./TurnstileWidget";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Shared lead-form submit hook. Posts a plain object as JSON to a given API
 * route and tracks loading/success/error UI states.
 */
export function useLeadForm(endpoint: string, turnstileAction: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState(false);
  const [turnstileVersion, setTurnstileVersion] = useState(0);

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
    setTurnstileError(false);
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    setTurnstileError(true);
    setTurnstileVersion((version) => version + 1);
  }, []);

  async function submit(payload: Record<string, string>) {
    if (!turnstileToken) {
      setTurnstileError(true);
      return false;
    }

    setStatus("loading");
    setError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          "cf-turnstile-response": turnstileToken,
        }),
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
    } finally {
      setTurnstileToken("");
      setTurnstileVersion((version) => version + 1);
    }
  }

  function reset() {
    setStatus("idle");
    setError("");
  }

  const turnstile = createElement(
    "div",
    null,
    createElement(TurnstileWidget, {
      key: turnstileVersion,
      action: turnstileAction,
      onToken: handleTurnstileToken,
      onReset: resetTurnstile,
    }),
    turnstileError &&
      createElement(
        "p",
        { className: "mt-2 text-sm text-signal-red", role: "alert" },
        "Please complete the bot check and try again.",
      ),
  );

  return { status, error, submit, reset, turnstile };
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
