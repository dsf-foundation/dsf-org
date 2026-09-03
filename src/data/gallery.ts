import { programs } from "@/data/images";

export type GalleryAlbum = { id: string; label: string };

const activityTitles: Record<string, string> = {
  "education-aid": "Education Aid",
  schools: "School Support",
  "emergency-relief": "Emergency Relief",
  "food-support": "Food Support",
  "housing-shelter": "Housing & Shelter",
  "medical-aid": "Medical Aid",
  "medical-camps": "Medical Camps",
  "water-sanitation": "Tube Wells & Sanitation",
  "sewing-machine-support": "Sewing Machine Support",
  "shop-support": "Shop Support",
  "van-rickshaw-support": "Van & Rickshaw Support",
  "wheelchair-support": "Wheelchair Support",
  "community-programs": "Community & Religious Programs",
};

const captionPool: Record<string, string[]> = {
  education: ["Students with learning supplies", "In the classroom", "Books and stationery prepared", "Children learning together", "A focused student at work", "Education materials ready", "Reading together", "Classroom scene"],
  schools: ["Students in the classroom", "A busy school day", "Children learning together", "Young learners at work", "School group photo", "Students studying", "Class activity in progress", "School children together", "Learners focused on lessons", "Students sharing a book", "Morning assembly", "Working on a project", "Recess and play", "Reading time", "Classroom discussion", "Students at their desks", "A lesson in progress", "School outing", "Children in the schoolyard", "Teaching and learning", "Students raising hands", "Group activity", "Learning materials", "Classroom preparation", "School day", "Children in uniform", "A student presenting", "Pair work in class", "School community gathering", "Happy learners", "Education in action", "Classroom setting", "Students collaborating", "A school moment", "Lesson time", "Children focused", "School life", "Studying together", "Students in class", "A teaching moment", "Classroom work", "Young students learning", "Children at school", "School community", "A class together", "Students and teacher", "School preparation", "Learning together", "Classroom activity", "Students in the school", "Children in the classroom", "A school scene", "Students working", "Education support", "Classroom time", "School learning", "Children engaged", "A learning space", "Students gathered", "School group", "Children studying", "Students in school", "Classroom work in progress", "A student at desk", "Children in the classroom", "School day activities", "Learners at school", "Students in the lesson", "Classroom discussion", "Children learning", "Students together", "School activities", "A class photo", "Students in the schoolyard", "Children at their desks", "School community life", "Students focused", "Learning together", "Children in uniform", "School assembly", "Students raising hands", "Classroom activity", "A school group", "Children learning together", "Students at school", "Education materials", "Classroom preparation", "School work", "Children in class", "Students learning", "A school moment"],
  relief: ["Relief packages ready", "Food and water distribution", "Emergency supplies", "Aid reaching the community", "Family essentials being packed", "Distribution day", "Workers preparing relief", "Emergency response", "Supplies organized for delivery", "Aid workers mobilized", "Relief on the ground", "Helping affected families", "Emergency supplies loaded", "Community support underway", "Relief coordination", "Essential packages", "Hope in a box", "Disaster response", "Families receiving aid", "Relief team in action"],
  food: ["A warm meal served", "Food prepared with care", "Cooking for the community", "Nourishing a family"],
  housing: ["Building a home", "Shelter under construction", "Rebuilding together", "A family's new home", "Housing project underway", "Repair work in progress", "Durable home construction", "Community builds shelter", "A safe foundation", "Walls going up", "Home being rebuilt", "Construction with care", "A shelter taking shape", "Housing for a family", "Repairing a roof", "Building with the community", "A solid frame", "Shelter materials ready", "New home progress", "Rebuilding hope", "A sturdy house", "Construction team", "Community housing", "Home improvement", "Structural repairs", "Shelter completion", "Building together", "A new beginning", "Family home restored", "Safe and secure", "Housing support", "Rebuilding a life", "Construction site", "A roof over their head", "Solid and safe", "Home improvement work", "Shelter built with care", "Rebuilding the community", "Housing construction", "Family home repair", "A permanent home", "Building materials", "Shelter progress", "Rebuilding after loss", "A restored home", "Construction underway", "Family housing", "Safe shelter", "Rebuilding together", "A home restored", "Building a future", "Housing project", "Community rebuild", "Home construction", "A family's shelter", "Repair and restore", "Building safety", "Shelter construction", "A new home", "Rebuilding work", "Housing restoration", "Community effort", "Building shelter", "A sturdy home", "Restoring a home", "Housing rebuild", "Safe construction", "Family shelter", "Home being built", "Rebuilding homes", "Construction progress", "A restored building", "Shelter upgrade", "Building together", "Home repairs", "Housing renewal", "Community build", "A new shelter", "Rebuilding with care", "Construction complete", "A family home", "Shelter restoration", "Building hope", "Home rebuilding", "Structural work", "Housing repairs", "Community shelter", "A fresh start", "Rebuilding project", "Safe housing", "Restoration work", "Building a home", "Family shelter"],
  healthcare: ["Medical check-up", "Healthcare delivery", "Doctor treating a patient", "Medicine and care", "Health worker in the field", "Clinic visit", "Medical support", "Treatment underway", "Healthcare worker", "Patient receiving care", "Health consultation", "Nursing care", "Medical supplies ready", "Health screening", "Care and recovery", "Medical assistance", "Health worker support", "Treatment session", "Healthcare outreach", "Doctor consultation", "Medical care", "Health worker patient", "Care delivery", "Medical attention", "Health clinic", "Treatment support", "Medical supplies", "Health services", "Caregiver at work", "Medical help", "Health worker community", "Patient care", "Healthcare team", "Medical outreach", "Doctor patient", "Treatment care", "Health support worker", "Clinic healthcare", "Medical aid delivery", "Health worker patient", "Caregiver support", "Medical team", "Health services delivery", "Patient treatment", "Healthcare support", "Medical worker", "Care delivery", "Health consultation", "Medical care", "Nurse patient", "Healthcare provider", "Medical attention", "Health worker care", "Patient support", "Medical treatment", "Health services", "Care worker", "Medical outreach", "Healthcare worker", "Doctor patient care", "Medical supplies", "Health worker community", "Patient medical care", "Healthcare delivery", "Medical support worker", "Health worker patient", "Caregiver", "Medical team support", "Health services", "Doctor treatment", "Medical care delivery", "Healthcare outreach", "Medical worker patient", "Care worker support", "Health clinic", "Medical assistance", "Healthcare provider", "Patient care delivery", "Medical help", "Health worker", "Caregiver patient", "Medical team care", "Health services support", "Doctor care", "Medical worker support", "Healthcare delivery", "Patient medical help", "Health worker treatment", "Medical care", "Caregiver support", "Health worker care", "Medical services", "Doctor support", "Healthcare patient", "Medical care delivery"],
  "medical-camp": ["Medical camp set up", "Doctor at a camp", "Patients waiting for care", "Free health check-up", "Medicines being distributed", "Medical camp in session", "Volunteers at a camp", "Community health camp", "Patients receiving treatment", "Health advice given", "Camp medical team", "Check-up station", "Patients seen at camp", "Medical team volunteering", "Health camp outreach", "Free consultation", "Patient at the camp", "Medicine handed out", "Health screening camp", "Doctor treating patients", "Community health", "Medical volunteers", "Health advice sharing", "Camp doctor", "Patient consultation", "Medical camp care", "Health worker camp", "Treatment at camp", "Medical outreach camp", "Patient health check", "Free medicine camp", "Health camp", "Doctor volunteering", "Patient care camp", "Medical team", "Health camp delivery", "Community health camp", "Doctor check-up", "Patient at camp", "Medical support camp", "Health services camp", "Treatment camp", "Medical care camp", "Volunteer doctor", "Patient consultation camp", "Health screening", "Medicine camp", "Community care camp", "Medical help camp", "Health worker camp", "Doctor patient camp", "Free health camp", "Patient care", "Medical team camp", "Health outreach", "Camp services", "Medical volunteer", "Patient health", "Doctor at camp", "Health camp team", "Treatment camp", "Medical care", "Volunteer health", "Patient camp", "Community camp", "Medical outreach", "Health patient", "Doctor camp", "Health services", "Treatment volunteer", "Medical help", "Health camp patient", "Care camp", "Medical outreach patient", "Health doctor", "Camp patient", "Medical volunteer care", "Health treatment", "Doctor care", "Medical camp outreach", "Patient volunteer", "Health camp care", "Doctor treatment", "Medical patient", "Health services volunteer", "Camp health", "Medical care volunteer", "Patient treatment", "Health doctor care", "Camp medical", "Doctor volunteer care"],
  community: ["A community gathering", "People together", "Sharing warmth and care", "Community support", "Community life", "People coming together", "Belonging and care", "Sharing a meal", "Community event", "Together in the community", "A community moment", "Community celebration", "Neighbors together", "Community bonds", "People supporting", "Community gathering", "Warmth and togetherness", "Caring community", "Community connection", "Sharing together", "A shared moment", "Community care", "People first", "Belonging", "A community scene", "Community spirit", "People gathered", "Community sharing", "Togetherness", "Community event gathering", "Neighbors meeting", "Community bond", "Sharing support", "Community welcome", "People connected", "A community group", "Community sharing", "Together caring", "Community gathering gathering", "Neighbors together", "Community sharing", "A community photo", "Community moment", "People together", "Sharing care", "Community gathering", "Neighbors connected", "Community spirit", "A community group", "People sharing", "Community moment"],
  shop: ["A small shop", "Shop support", "Stocking goods", "Small business", "A market stall", "Trading goods", "Shop owner", "Business supplies", "A shopfront", "Goods arranged", "Shop assistance", "A retail shop", "Products on display", "Shop inventory", "Small shop owner", "Goods delivery", "Shop operation", "Business setup", "A shop stall", "Retail supplies"],
  sewing: ["Sewing machine in use", "Tailoring work", "A seamstress at work", "Fabric and thread", "Sewing skills training", "Making garments", "Stitching fabric", "Tailoring training", "A sewing project", "Hand sewing", "Machine operation", "Garment making", "Textile work", "Craftsmanship", "Sewing skills", "Tailoring workshop", "Fabric cutting", "A sewing lesson", "Garment creation", "Stitching work", "Sewing training", "A maker at work", "Textile craftsmanship", "Sewing practice", "Pattern making", "A sewing task", "Garment work"],
  "van-rickshaw": ["A van in service", "A rickshaw driver", "Vehicle for work", "Rickshaw on the road", "Daily transport", "A working vehicle", "Driver and vehicle", "Transport service", "Van and driver", "Rickshaw ride", "A worker's vehicle", "Transport earners", "Vehicle ready", "Road transport", "A rickshaw photo", "Driver work", "Vehicle for earning", "Transport workers", "Daily commute", "A vehicle working"],
  wheelchair: ["A wheelchair provided", "Mobility restored", "Wheelchair user", "Independence in motion", "Freedom with a wheelchair", "A wheelchair gift", "Mobility support", "Wheelchair delivery", "Movement with dignity", "Wheelchair assistance", "A person in a wheelchair", "Mobility aid", "Wheelchair support", "Rolling forward", "A wheelchair journey", "Freedom to move", "Wheelchair empowerment", "Independent mobility", "Wheelchair gift", "Mobility freedom"],
};

function captionsFor(program: string, count: number): string[] {
  const pool = captionPool[program] ?? ["Field photo"];
  return Array.from({ length: count }, (_, i) => pool[i % pool.length]);
}

const programKeys: string[] = [
  "education-aid",
  "schools",
  "emergency-relief",
  "food-support",
  "housing-shelter",
  "medical-aid",
  "medical-camps",
  "water-sanitation",
  "sewing-machine-support",
  "shop-support",
  "van-rickshaw-support",
  "wheelchair-support",
  "community-programs",
];

const programFolders: Record<string, string[]> = {
  "education-aid": ["education"],
  schools: ["schools"],
  "emergency-relief": ["relief"],
  "food-support": ["food"],
  "housing-shelter": ["housing"],
  "medical-aid": ["healthcare"],
  "medical-camps": ["medical-camp"],
  "water-sanitation": ["water"],
  "sewing-machine-support": ["sewing"],
  "shop-support": ["shop"],
  "van-rickshaw-support": ["van-rickshaw"],
  "wheelchair-support": ["wheelchair"],
  "community-programs": ["community"],
};

export const galleryAlbums: GalleryAlbum[] = [
  { id: "all", label: "All" },
  ...programKeys.map((k) => ({ id: k, label: activityTitles[k] })),
];

export type GalleryPhoto = {
  src: string;
  album: string;
  caption: string;
};

export const galleryPhotos: GalleryPhoto[] = programKeys.flatMap((k) => {
  const album = k;
  const folders = programFolders[k];
  return folders.flatMap((folder) => {
    const srcs = programs[folder as keyof typeof programs] ?? [];
    return srcs.map((src, i) => ({
      src,
      album,
      caption: captionsFor(folder, srcs.length)[i],
    }));
  });
});