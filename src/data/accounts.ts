export type DonationAccount = {
  id: string;
  kind: "mobile" | "bank";
  label: string;
  number: string;
  logo?: string;
  note?: string;
  /** Mobile banking details */
  mobile?: {
    sendInstruction: string;
  };
  /** Bank details (domestic + international) */
  bank?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    routing: string;
    swift: string;
    supportsInternational: boolean;
    currency: string;
  };
};

export const donationAmounts = [
  "Tk 100",
  "Tk 500",
  "Tk 1,000",
  "Tk 5,000",
  "Tk 10,000",
];

export const donationAccounts: DonationAccount[] = [
  {
    id: "bkash",
    kind: "mobile",
    label: "bKash",
    number: "01805-456 998",
    logo: "/images/bkash.png",
    note: "Domestic (Bangladesh) only",
    mobile: {
      sendInstruction: "Open bKash → Send Money → enter number & amount",
    },
  },
  {
    id: "nagad",
    kind: "mobile",
    label: "Nagad",
    number: "01805-456 998",
    logo: "/images/ngada.png",
    note: "Domestic (Bangladesh) only",
    mobile: {
      sendInstruction: "Open Nagad → Send Money → enter number & amount",
    },
  },
  {
    id: "rocket",
    kind: "mobile",
    label: "Rocket",
    number: "01805-456 998",
    logo: "/images/rocket.webp",
    note: "Domestic (Bangladesh) only",
    mobile: {
      sendInstruction: "Open Rocket → Send Money → enter number & amount",
    },
  },
  {
    id: "bank",
    kind: "bank",
    label: "Bank Transfer",
    number: "401911100005374",
    logo: "/images/nrbc-bank.png",
    bank: {
      accountName: "Do Something Foundation",
      accountNumber: "401911100005374",
      bankName: "NRB Commercial Bank PLC",
      branch: "Aftabnagar, Dhaka",
      routing: "250279512",
      swift: "NRBCBDDH",
      supportsInternational: true,
      currency: "BDT",
    },
    note: "Domestic & international (SWIFT)",
  },
];
