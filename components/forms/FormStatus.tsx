export function SuccessCard({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div
      className="card border-live-green/40 bg-live-green/5 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-live-green/15">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6CC520"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="h3 text-off-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mid-gray">{message}</p>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p
      className="rounded-md border border-signal-red/40 bg-signal-red/10 px-4 py-3 text-sm text-off-white"
      role="alert"
    >
      {message}
    </p>
  );
}

export function SubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      aria-busy={loading}
    >
      {loading ? "Sending…" : children}
    </button>
  );
}
