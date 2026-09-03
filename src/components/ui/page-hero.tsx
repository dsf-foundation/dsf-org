import Image from "next/image";

export function PageHero({
  title,
  subtitle,
  image,
  stats,
  children,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  image: string;
  stats?: { value: string; label: string }[];
  children?: React.ReactNode;
}) {
  const statCols =
    stats && stats.length === 3
      ? "sm:grid-cols-3"
      : stats && stats.length === 4
        ? "sm:grid-cols-4"
        : "sm:grid-cols-2";

  return (
    <section className="relative flex items-center min-h-[55vh] overflow-hidden bg-ink">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-80"
      />
      <div aria-hidden className="absolute inset-0 hero-overlay" />
      <div className="container-site relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="display-xl text-5xl text-white">{title}</h1>
          {subtitle && (
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/85 md:text-xl md:leading-9">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>

        {stats && stats.length > 0 && (
          <div
            className={`mt-14 grid max-w-3xl grid-cols-2 gap-px bg-white/10 ${statCols}`}
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-ink/30 px-5 py-6">
                <p className="stat-num text-3xl text-white md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs font-medium text-white/70">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
