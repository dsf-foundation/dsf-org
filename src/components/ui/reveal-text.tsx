/**
 * Plain text wrapper. Never hides content — guaranteed visible.
 */
export function RevealText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return <span className={`inline-block ${className}`}>{children}</span>;
}
