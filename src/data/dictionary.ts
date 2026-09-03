export const dict = {
  topbar: {
    callNow: "Call Now For Any Query",
  },
  nav: {
    home: "Home",
    about: "About",
    work: "Our Work",
    gallery: "Gallery",
    getInvolved: "Get Involved",
    blog: "News",
    contact: "Contact",
  },
  actions: {
    donate: "Donate",
    knowMore: "Learn more",
    allWork: "Explore our work",
    seeDetails: "See details",
    seeMore: "See all",
    subscribe: "Subscribe",
    submit: "Send",
  },
  hero: {
    kicker: "Serving Bangladesh · Supported worldwide",
    title: "Help that changes lives",
    subtitle:
      "We are a government-registered Bangladeshi foundation working for education, food, shelter, healthcare and livelihoods — serving vulnerable families across Bangladesh, with the trust of donors at home and around the world.",
    trustLine: [
      "Registered in Bangladesh",
      "SWIFT international transfers",
      "Audited & transparent",
    ],
    slides: [
      {
        kicker: "Education & skills",
        title: "Help that changes lives",
        subtitle:
          "A Bangladeshi foundation working for education, food, shelter, healthcare and livelihoods — serving vulnerable families across the country, with donors at home and abroad.",
        cta: "Donate",
        href: "/donate",
      },
      {
        kicker: "Emergency relief",
        title: "Immediate help when it matters most",
        subtitle:
          "When disaster strikes in Bangladesh, our teams move quickly to deliver food, clean water and essentials in the first critical days — and to support recovery after.",
        cta: "Give relief",
        href: "/donate",
      },
      {
        kicker: "Sustainable change",
        title: "Lasting change, built with communities",
        subtitle:
          "We stay with communities through recovery — helping people rebuild homes, livelihoods and hope on their own terms, backed by our supporters worldwide.",
        cta: "Explore our programs",
        href: "/activities",
      },
    ],
  },
  footer: {
    mission:
      "Do Something Foundation is a non-profit, government-registered Bangladeshi organization working for education, relief and practical support — helping ordinary people build a better, more hopeful life. Trusted by donors in Bangladesh and worldwide.",
    menu: "Explore",
    connect: "Connect",
    donate: "Support",
    contact: "Contact",
    copyright: "Copyright © 2026 Do Something Foundation. All rights reserved.",
  },
  trust: {
    registered: "Government-registered · Non-profit · Transparently run",
    international:
      "Registered in Bangladesh · Donations accepted from any country via SWIFT · Every gift verified and receipted",
  },
  international: {
    kicker: "Donors worldwide",
    title: "Supporting Bangladesh, from anywhere on earth",
    intro:
      "You don't need to be in Bangladesh to help. Supporters around the world give securely through our SWIFT bank account and receive a verified receipt for every contribution.",
    points: [
      "Secure SWIFT wire transfers from any country",
      "Foreign currency and BDT both accepted",
      "Verified receipt emailed for every donation",
      "Local team on the ground you can trust",
    ],
    cta: "Donate from abroad",
  },
  about: {
    origin:
      "Do Something Foundation is a locally grounded, government-registered nonprofit — accountable to the communities it serves and trusted by supporters at home and worldwide.",
  },
  home: {
    newsletter: "Stories from the field, delivered occasionally",
    whoWeAreOrigin:
      "We are a registered local nonprofit — trusted by donors at home and overseas.",
  },
} as const;

export type Dictionary = typeof dict;
