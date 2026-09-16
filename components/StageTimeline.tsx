import { DOC_STAGES } from "@/lib/site";

const DOT: Record<string, string> = {
  "electric-blue": "bg-electric-blue",
  "signal-red": "bg-signal-red",
  "live-green": "bg-live-green",
};
const RING: Record<string, string> = {
  "electric-blue": "ring-electric-blue/40",
  "signal-red": "ring-signal-red/40",
  "live-green": "ring-live-green/40",
};

/**
 * The recurring drone-documentation story, color-coded:
 * blue = pre, red = active build, green = complete.
 */
export default function StageTimeline({
  className = "",
}: {
  className?: string;
}) {
  return (
    <ol
      className={`flex items-center gap-2 sm:gap-3 ${className}`}
      aria-label="Documentation stages: Pre-Construction, Construction, Post-Construction"
    >
      {DOC_STAGES.map((stage, i) => (
        <li key={stage.label} className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ring-4 ${DOT[stage.color]} ${RING[stage.color]}`}
              aria-hidden
            />
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-label text-off-white/90 sm:text-xs">
              {stage.label}
            </span>
          </span>
          {i < DOC_STAGES.length - 1 && (
            <span
              className="h-px w-4 bg-light-gray/30 sm:w-8"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}
