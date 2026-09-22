"use client";

import { useLeadForm, formToObject } from "./useLeadForm";
import { Input, Textarea, Select, Honeypot } from "./fields";
import { SuccessCard, ErrorBanner, SubmitButton } from "./FormStatus";

const EVENT_TYPES = [
  "Wedding",
  "Religious Service",
  "Memorial / Funeral",
  "Nonprofit Gala",
  "Corporate Conference",
  "Other Event",
] as const;

export default function LivestreamForm() {
  const { status, error, submit, turnstile } = useLeadForm(
    "/api/livestream",
    "livestream",
  );

  if (status === "success") {
    return (
      <SuccessCard
        title="We've got your date."
        message="Thanks — we'll confirm availability for your event and send a tailored quote within one business day. Time-sensitive? Call (904) 431-7006."
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
      <Input id="l-name" name="name" label="Name" required autoComplete="name" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="l-email"
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          id="l-phone"
          name="phone"
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          id="l-type"
          name="eventType"
          label="Event Type"
          options={EVENT_TYPES}
        />
        <Input id="l-date" name="eventDate" label="Event Date" type="date" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="l-venue"
          name="venue"
          label="Venue"
          placeholder="Name or address"
        />
        <Input
          id="l-guests"
          name="guestCount"
          label="Guest Count"
          type="number"
          placeholder="Approx."
        />
      </div>
      <Textarea
        id="l-notes"
        name="notes"
        label="Event Notes"
        placeholder="Streaming destination (YouTube, private link…), run-of-show, and anything else we should know."
      />
      {turnstile}
      <ErrorBanner message={error} />
      <SubmitButton loading={status === "loading"}>
        Check Availability
      </SubmitButton>
    </form>
  );
}
