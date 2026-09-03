import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

export function TextLink({
  href,
  children,
  target,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      className="text-link group/link"
    >
      <span>{children}</span>
      <IoArrowForward className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
    </Link>
  );
}
