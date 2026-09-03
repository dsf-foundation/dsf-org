/**
 * Plain layout-safe wrapper. Never hides content — guaranteed visible.
 * Kept as a component so existing call sites (and their className/delay
 * props) keep working without layout interference.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
