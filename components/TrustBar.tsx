import { TRUST_POINTS } from "@/lib/site";

export default function TrustBar() {
  return (
    <div className="border-y border-white/10 bg-dark-surface/60">
      <div className="container-rb flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-4 text-center">
        {TRUST_POINTS.map((point, i) => (
          <span key={point} className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-label text-off-white/80 sm:text-xs">
              {point}
            </span>
            {i < TRUST_POINTS.length - 1 && (
              <span className="text-signal-red" aria-hidden>
                ·
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
