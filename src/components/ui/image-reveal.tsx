import Image from "next/image";

/**
 * Plain image wrapper. Never hides content — guaranteed visible and stable
 * in any grid/flex parent.
 */
export function ImageReveal({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes,
  priority,
  fill = true,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width, height })}
        priority={priority}
        sizes={sizes}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
