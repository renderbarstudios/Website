interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
  className = "",
}: SectionHeadingProps) {
  const Title = as;
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left";
  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Title
        className={
          as === "h1"
            ? "display text-balance"
            : "h2 text-balance text-off-white"
        }
      >
        {title}
      </Title>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-mid-gray">{intro}</p>
      )}
    </div>
  );
}
