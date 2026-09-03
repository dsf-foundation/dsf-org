export const locales = ["en", "bn"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type Localized<T = string> = T;

export function t<T>(value: T, _locale?: string): T {
  return value;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
