"use client";

import { useLeadForm, formToObject } from "./useLeadForm";
import { Input, Textarea, Select, Honeypot } from "./fields";
import { SuccessCard, ErrorBanner, SubmitButton } from "./FormStatus";
import { getService } from "@/lib/site";

const PACKAGE_OPTIONS = getService("drone").packages.map(
  (p) => `${p.name} (${p.price}${p.cadence})`,
);

export default function DroneForm() {
  const { status, error, submit, turnstile } = useLeadForm("/api/drone", "drone");

  if (status === "success") {
    return (
      <SuccessCard
        title="Quote request received."
        message="We'll run an airspace pre-check on your job site and follow up within one business day with availability and pricing. Urgent? Call (904) 431-7006."
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="d-name" name="name" label="Name" required autoComplete="name" />
        <Input
          id="d-company"
          name="company"
          label="Company"
          autoComplete="organization"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="d-email"
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          id="d-phone"
          name="phone"
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
        />
      </div>
      <Input
        id="d-address"
        name="jobSiteAddress"
        label="Job Site Address"
        required
        autoComplete="street-address"
        hint="Used for an FAA airspace pre-check before we fly. Street, city, ZIP."
      />
      <Select
        id="d-package"
        name="packageInterest"
        label="Package Interest"
        options={PACKAGE_OPTIONS}
        placeholder="Not sure yet — recommend one"
      />
      <Textarea
        id="d-notes"
        name="notes"
        label="Project Notes"
        placeholder="Project type (roofing, GC, developer…), timeline, and how often you need flights."
      />
      {turnstile}
      <ErrorBanner message={error} />
      <SubmitButton loading={status === "loading"}>
        Get a Free Aerial Quote
      </SubmitButton>
    </form>
  );
}
