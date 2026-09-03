function prog(folder: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/images/programs/${folder}/img-${String(i + 1).padStart(2, "0")}.jpg`
  );
}

const education = prog("education", 5);
const schools = prog("schools", 43);
const relief = prog("relief", 20);
const food = prog("food", 2);
const housing = prog("housing", 23);
const healthcare = prog("healthcare", 16);
const medicalCamp = prog("medical-camp", 24);
const community = prog("community", 14);
const shop = prog("shop", 9);
const sewing = prog("sewing", 7);
const water = prog("water", 28);
const vanRickshaw = prog("van-rickshaw", 13);
const wheelchair = prog("wheelchair", 9);

export const programs = {
  education,
  schools,
  relief,
  food,
  housing,
  healthcare,
  medicalCamp,
  community,
  shop,
  sewing,
  water,
  vanRickshaw,
  wheelchair,
};

/** Convenient per-program hero/card picks (real photos). */
export const hero = {
  home: community[0],
  about: community[1],
  relief: relief[0],
  education: education[0],
  schools: schools[0],
  food: food[0],
  housing: housing[0],
  healthcare: healthcare[0],
  medicalCamp: medicalCamp[0],
  community: community[0],
  shop: shop[0],
  sewing: sewing[0],
  water: water[0],
  vanRickshaw: vanRickshaw[0],
  wheelchair: wheelchair[0],
};

export const story = {
  team: community[1],
  field: relief[2],
  hands: healthcare[3],
  life: community[2],
};

/** Backwards-compatible aggregate used by components/gallery. */
export const img = {
  hero: {
    education: hero.education,
    children: hero.schools,
    community: hero.community,
  },
  programs: {
    education: hero.education,
    classrooms: schools[2],
    skills: schools[4],
    relief: hero.relief,
    food: hero.food,
    meals: food[1],
    water: hero.water,
    housing: hero.housing,
    shelter: housing[2],
    healthcare: hero.healthcare,
    doctor: healthcare[2],
    livelihoods: hero.shop,
    farming: hero.water,
    women: hero.sewing,
    volunteers: hero.community,
    tree: community[3],
  },
  stories: {
    field: story.field,
    hands: story.hands,
    team: story.team,
    river: hero.relief,
    kidsClass: schools[3],
  },
  newsletter: hero.community,
} as const;
