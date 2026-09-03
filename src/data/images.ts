function prog(folder: string, indices: number[]): string[] {
  return indices.map(
    (i) => `/images/programs/${folder}/img-${String(i).padStart(2, "0")}.jpg`
  );
}

const education = prog("education", [1, 3]);
const schools = prog("schools", [1, 2, 3, 4, 5, 6]);
const relief = prog("relief", [1, 2, 3, 5]);
const food = prog("food", [1, 2]);
const housing = prog("housing", [1, 2, 3, 5, 8]);
const healthcare = prog("healthcare", [1, 3, 4, 5]);
const medicalCamp = prog("medical-camp", [1, 2, 4, 7]);
const community = prog("community", [1, 2, 3, 4, 7]);
const shop = prog("shop", [1, 2, 4]);
const sewing = prog("sewing", [1, 2, 4]);
const water = prog("water", [1, 2, 4]);
const vanRickshaw = prog("van-rickshaw", [1, 2, 4]);
const wheelchair = prog("wheelchair", [1, 2, 4]);

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
  hands: healthcare[2],
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
    doctor: healthcare[1],
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
