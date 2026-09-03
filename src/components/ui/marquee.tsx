export function Marquee({
  children,
  speed = 40,
  className = "",
  gapClass = "gap-6",
  fade = true,
  fadeColor,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  gapClass?: string;
  fade?: boolean;
  fadeColor?: string;
}) {
  return (
    <div
      className={`marquee ${fade ? "marquee-fade" : ""} ${className}`}
      style={
        {
          "--marquee-duration": `${speed}s`,
          ...(fadeColor ? { "--marquee-fade-from": fadeColor } : {}),
        } as React.CSSProperties
      }
    >
      <div className="marquee-track">
        <div className={`marquee-group ${gapClass}`}>{children}</div>
        <div className={`marquee-group ${gapClass}`} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
