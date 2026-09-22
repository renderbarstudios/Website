"use client";

import { useLeadForm, formToObject } from "./useLeadForm";
import { Input, Textarea, Select, Honeypot } from "./fields";
import { SuccessCard, ErrorBanner, SubmitButton } from "./FormStatus";
import { SERVICE_INTERESTS } from "@/lib/site";
import TurnstileWidget from "./TurnstileWidget";
import { useCallback, useState } from "react";

export default function ContactForm() {
  const { status, error, submit } = useLeadForm("/api/contact");
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

  if (status === "success") {
    return (
      <SuccessCard
        title="Message received."
        message="Thanks for reaching out — we'll get back to you within one business day. Need us sooner? Call (904) 431-7006."
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!turnstileToken) {
          setTurnstileError(true);
          return;
        }
        void submit({
          ...formToObject(e.currentTarget),
          "cf-turnstile-response": turnstileToken,
        }).then((ok) => {
          if (!ok) resetTurnstile();
        });
      }}
      className="relative space-y-5"
    >
      <Honeypot />
      <Input id="c-name" name="name" label="Name" required autoComplete="name" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="c-email"
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          id="c-phone"
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
        />
      </div>
      <Select
        id="c-service"
        name="serviceInterest"
        label="Service Interest"
        options={SERVICE_INTERESTS}
      />
      <Textarea
        id="c-message"
        name="message"
        label="Message"
        rows={5}
        placeholder="Tell us about your project, timeline, and location."
      />
      <div>
        <TurnstileWidget
          key={turnstileVersion}
          onToken={handleTurnstileToken}
          onReset={resetTurnstile}
        />
        {turnstileError && (
          <p className="mt-2 text-sm text-signal-red" role="alert">
            Please complete the bot check and try again.
          </p>
        )}
      </div>
      <ErrorBanner message={error} />
      <SubmitButton loading={status === "loading"}>Send Message</SubmitButton>
    </form>
  );
}
