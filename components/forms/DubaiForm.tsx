"use client";

import { useLeadForm, formToObject } from "./useLeadForm";
import { Input, Textarea, Select, Honeypot } from "./fields";
import { SuccessCard, ErrorBanner, SubmitButton } from "./FormStatus";

const DUBAI_SERVICES = [
  "Drone Documentation",
  "Event Livestreaming",
  "Short-Form Video",
  "Multiple Services",
] as const;

export default function DubaiForm() {
  const { status, error, submit, turnstile } = useLeadForm("/api/dubai", "dubai");

  if (status === "success") {
    return (
      <SuccessCard
        title="Enquiry received."
        message="Shukran — thanks for reaching out. Our team will get back to you within one business day with availability and an AED quote."
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit(formToObject(e.currentTarget));
      }}
      className="relative space-y-5"
    >
      <Honeypot />
      <Input id="ae-name" name="name" label="Name" required autoComplete="name" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="ae-email"
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          id="ae-phone"
          name="phone"
          label="Phone / WhatsApp"
          type="tel"
          autoComplete="tel"
          hint="Optional"
        />
      </div>
      <Select
        id="ae-service"
        name="serviceInterest"
        label="Service Interest"
        options={DUBAI_SERVICES}
      />
      <Textarea
        id="ae-message"
        name="message"
        label="Project / Event Details"
        rows={5}
        placeholder="Tell us about your project or event, location in the UAE, and timeline."
      />
      {turnstile}
      <ErrorBanner message={error} />
      <SubmitButton loading={status === "loading"}>
        Request a Dubai Quote
      </SubmitButton>
    </form>
  );
}
