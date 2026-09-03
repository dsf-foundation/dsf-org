import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { blogPosts } from "../src/data/blogs";
import { galleryPhotos as staticPhotos } from "../src/data/gallery";
import { img } from "../src/data/images";
import { dict } from "../src/data/dictionary";

const SERVICE_ACCOUNT_PATH = resolve(process.cwd(), "service-account.json");

const HEROES_COL = "heroes";
const BLOGS_COL = "blogs";
const HOME_SLIDES_COL = "homeSlides";
const HOME_SLIDES_DOC = "main";
const HOME_GALLERY_COL = "homeGallery";
const HOME_GALLERY_DOC = "main";
const CERTIFICATES_COL = "certificates";
const CERTIFICATES_DOC = "main";
const PARTNERS_COL = "partners";
const PARTNERS_DOC = "main";

const STATIC_HEROES: Record<string, { kicker: string; title: string; subtitle: string; image: string }> = {
  about: {
    kicker: "Who we are",
    title: "About our foundation",
    subtitle:
      "Do Something Foundation is a government-registered Bangladeshi nonprofit working for education, relief and practical support.",
    image: img.stories.river,
  },
  activities: {
    kicker: "What we do",
    title: "Our programs",
    subtitle:
      "From education to emergency relief, water, shelter, healthcare and livelihoods — explore the ongoing humanitarian work of Do Something Foundation.",
    image: img.programs.shelter,
  },
  blog: {
    kicker: "News & stories",
    title: "News",
    subtitle: "Field reports and updates from our education, relief and humanitarian work.",
    image: img.stories.field,
  },
  gallery: {
    kicker: "Moments that matter",
    title: "Gallery",
    subtitle: "Real moments from real programs — captured as it happens on the ground.",
    image: img.hero.community,
  },
  contact: {
    kicker: "Get in touch",
    title: "Contact us",
    subtitle:
      "Whether it's about donations, volunteering, a partnership or a press enquiry, we're glad to hear from you.",
    image: img.programs.skills,
  },
  donate: {
    kicker: "Support our mission",
    title: "Donate",
    subtitle: "Every contribution — however small — keeps education, relief and skill programs running.",
    image: img.programs.relief,
  },
  "get-involved": {
    kicker: "Partner with us",
    title: "Get involved",
    subtitle: "There are many genuine ways to be part of our work — by giving, volunteering, partnering, or spreading the word.",
    image: "/images/programs/community/img-07.jpg",
  },
};

const DRY_RUN = process.argv.includes("--dry-run");

function getApp() {
  if (getApps().length > 0) return getApps()[0];
  const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, "utf8"));
  return initializeApp({
    credential: cert(serviceAccount),
  });
}

async function seedHeroes(db: Firestore) {
  const col = db.collection(HEROES_COL);

  if (DRY_RUN) {
    console.log("[dry-run] would remove orphaned heroes/home (home uses the slider now)");
  } else {
    const homeRef = col.doc("home");
    if ((await homeRef.get()).exists) {
      await homeRef.delete();
      console.log("✗ heroes/home (removed — home uses the slider)");
    }
  }

  for (const [slug, hero] of Object.entries(STATIC_HEROES)) {
    if (DRY_RUN) {
      console.log(`[dry-run] heroes/${slug}`);
    } else {
      await col.doc(slug).set(hero);
      console.log(`✓ heroes/${slug}`);
    }
  }
  console.log(`Seeded ${Object.keys(STATIC_HEROES).length} heroes`);
}

async function seedBlogs(db: Firestore) {
  const col = db.collection(BLOGS_COL);
  const now = new Date().toISOString();

  if (DRY_RUN) {
    console.log("[dry-run] would remove all existing blogs");
  } else {
    const existing = await col.listDocuments();
    for (const docRef of existing) {
      await docRef.delete();
      console.log(`✗ blogs/${docRef.id}`);
    }
  }

  for (const post of blogPosts) {
    const { slug, ...rest } = post;
    const data = {
      slug,
      ...rest,
      createdAt: now,
      updatedAt: now,
    };
    if (DRY_RUN) {
      console.log(`[dry-run] blogs/${slug}`);
    } else {
      await col.doc(slug).set(data);
      console.log(`✓ blogs/${slug}`);
    }
  }
  console.log(`Seeded ${blogPosts.length} blogs`);
}

async function seedHomeSlides(db: Firestore) {
  const docRef = db.collection(HOME_SLIDES_COL).doc(HOME_SLIDES_DOC);
  const slideImages = [img.hero.children, img.hero.education, img.hero.community];
  const staticSlides = dict.hero.slides ?? [];
  const slides = staticSlides.map((s, i) => ({
    id: `seed-slide-${i}`,
    kicker: s.kicker,
    title: s.title,
    subtitle: s.subtitle,
    cta: s.cta,
    href: s.href,
    image: slideImages[i] ?? img.hero.children,
  }));
  const data = { slides, updatedAt: new Date().toISOString() };
  if (DRY_RUN) {
    console.log(`[dry-run] homeSlides/main (${slides.length} slides)`);
  } else {
    await docRef.set(data);
    console.log(`✓ homeSlides/main (${slides.length} slides)`);
  }
  console.log(`Seeded ${slides.length} home slides`);
}

async function seedHomeGallery(db: Firestore) {
  const docRef = db.collection(HOME_GALLERY_COL).doc(HOME_GALLERY_DOC);
  const photos = staticPhotos.slice(20, 25).map((p) => ({
    src: p.src,
    caption: p.caption,
  }));
  const data = { photos, updatedAt: new Date().toISOString() };
  if (DRY_RUN) {
    console.log(`[dry-run] homeGallery/main (${photos.length} photos)`);
  } else {
    await docRef.set(data);
    console.log(`✓ homeGallery/main (${photos.length} photos)`);
  }
  console.log(`Seeded ${photos.length} home gallery photos`);
}

async function seedCertificates(db: Firestore) {
  const docRef = db.collection(CERTIFICATES_COL).doc(CERTIFICATES_DOC);
  const items = Array.from({ length: 6 }, (_, i) => ({
    src: `/images/certificates/certificate-0${i + 1}.jpeg`,
    name: `Certificate ${i + 1}`,
  }));
  const data = { items, updatedAt: new Date().toISOString() };
  if (DRY_RUN) {
    console.log(`[dry-run] certificates/main (${items.length} certificates)`);
  } else {
    await docRef.set(data);
    console.log(`✓ certificates/main (${items.length} certificates)`);
  }
  console.log(`Seeded ${items.length} certificates`);
}

async function seedPartners(db: Firestore) {
  const docRef = db.collection(PARTNERS_COL).doc(PARTNERS_DOC);
  const items = [
    { src: "/images/bkash.png", name: "bKash" },
    { src: "/images/rocket.webp", name: "Rocket" },
    { src: "/images/ngada.png", name: "NGO Affairs Bureau" },
    { src: "/images/nrbc-bank.png", name: "NRBC Bank" },
  ];
  const data = { items, updatedAt: new Date().toISOString() };
  if (DRY_RUN) {
    console.log(`[dry-run] partners/main (${items.length} partners)`);
  } else {
    await docRef.set(data);
    console.log(`✓ partners/main (${items.length} partners)`);
  }
  console.log(`Seeded ${items.length} partners`);
}

async function main() {
  const app = getApp();
  const db = getFirestore(app);

  console.log(DRY_RUN ? "DRY RUN — no writes will be made\n" : "Seeding Firestore...\n");

  await seedHeroes(db);
  console.log("");
  await seedBlogs(db);
  console.log("");
  await seedHomeSlides(db);
  console.log("");
  await seedHomeGallery(db);
  console.log("");
  await seedCertificates(db);
  console.log("");
  await seedPartners(db);

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
