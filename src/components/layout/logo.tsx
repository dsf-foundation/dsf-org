import Image from "next/image";

export function Logo({
  className = "",
  height = 34,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="Do Something Foundation"
      width={292}
      height={65}
      style={{ height: `${height}px`, width: "auto" }}
      className={`object-contain ${className}`}
    />
  );
}
