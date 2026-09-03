export function bnNum(n: number): string {
  const digits = "০১২৩৪৫৬৭৮৯";
  return String(n)
    .split("")
    .map((d) => digits[Number(d)])
    .join("");
}
