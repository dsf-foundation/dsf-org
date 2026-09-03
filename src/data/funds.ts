import { img } from "@/data/images";

export type Fund = {
  slug: string;
  image: string;
  title: string;
  description: string;
};

export const funds: Fund[] = [
  {
    slug: "emergency-relief",
    image: img.programs.relief,
    title: "Emergency Relief Fund",
    description:
      "Every year, floods and other disasters leave families with nothing. This fund lets us respond quickly — delivering food, clean water and essentials in the critical first days, and staying with communities through recovery.",
  },
  {
    slug: "education",
    image: img.programs.education,
    title: "Education Fund",
    description:
      "Helps children stay in school and gives young adults real, employable skills. From learning materials to vocational training, this fund builds the capability that lifts families out of poverty for good.",
  },
  {
    slug: "general",
    image: img.programs.livelihoods,
    title: "General Support Fund",
    description:
      "Regular donations keep every program running — from water and shelter to healthcare and livelihoods. Give once or monthly, at any amount that works for you, and change it or stop it anytime.",
  },
];

export const fundCount = funds.length;
