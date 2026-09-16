import { ReactNode } from "react";

const baseField =
  "w-full rounded-md border border-white/15 bg-void-black px-4 py-3 text-base text-off-white placeholder:text-mid-gray/70 transition-colors focus:border-link-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-signal-red";

const labelCls =
  "mb-2 block text-xs font-bold uppercase tracking-label text-off-white/80";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export function FieldShell({
  id,
  label,
  required,
  hint,
  children,
}: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && (
          <span className="text-signal-red" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-mid-gray">{hint}</p>}
    </div>
  );
}

interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
}

export function Input({
  id,
  name,
  label,
  type = "text",
  required,
  placeholder,
  autoComplete,
  hint,
}: InputProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={baseField}
      />
    </FieldShell>
  );
}

export function Textarea({
  id,
  name,
  label,
  required,
  placeholder,
  rows = 4,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <FieldShell id={id} label={label} required={required}>
      <textarea
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={baseField + " resize-y"}
      />
    </FieldShell>
  );
}

export function Select({
  id,
  name,
  label,
  options,
  required,
  placeholder = "Select one…",
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <FieldShell id={id} label={label} required={required}>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className={baseField}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/** Hidden honeypot field — visually & a11y hidden, but bots fill it. */
export function Honeypot() {
  return (
    <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden>
      <label htmlFor="website">Leave this field empty</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
