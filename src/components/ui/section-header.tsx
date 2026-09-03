import { Reveal } from "@/components/ui/reveal";

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  action,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`mb-12 md:mb-16 ${centered ? "text-center" : "text-left"}`}
    >
      <div
        className={`flex items-end justify-between gap-6 ${
          centered ? "flex-col items-center" : ""
        }`}
      >
        <div className={centered ? "max-w-2xl" : ""}>
          <h2 className="display-md text-3xl text-ink">{title}</h2>
          {subtitle && (
            <p
              className={`mt-5 text-base leading-8 text-muted md:text-lg ${
                centered ? "mx-auto" : "max-w-xl"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
