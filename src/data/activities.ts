import { programs, hero } from "@/data/images";
import type { RichBlock } from "@/components/ui/rich-content";

export type Activity = {
  slug: string;
  image: string;
  tag: string;
  title: string;
  short: string;
  intro: string;
  blocks: RichBlock[];
  meta: { label: string; value: string }[];
  galleryAlbum?: string;
  hasBranches?: boolean;
};

export type SchoolBranch = {
  slug: string;
  name: string;
  location: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
};

export const programsTag: string = "Our Programs";

export const activitiesRaw: Activity[] = [
  {
    slug: "education-aid",
    image: hero.education,
    tag: "Education",
    title: "Education Aid",
    short:
      "Every child deserves to learn. We provide books, uniforms and support so no student has to choose between education and survival.",
    intro:
      "Imagine a child waking up before dawn, walking miles to school, only to be turned away because they cannot afford a notebook. This is the reality for thousands of families in Bangladesh. Our Education Aid program steps in at the exact moment when a child's future hangs in the balance — covering the costs that stand between a student and their classroom.",
    blocks: [
      {
        type: "heading",
        text: "The cost of hope",
      },
      {
        type: "paragraph",
        text: "For many families, the decision to keep a child in school comes down to impossible choices. A mother may sacrifice her own meal to buy her daughter a pen. A father may pull his son out of school to work — not because he doesn't value education, but because the family simply cannot survive otherwise.",
      },
      {
        type: "image",
        src: programs.education[0],
        alt: "Education materials prepared for students",
        caption: "Every book and pen we provide represents a child who stays in school.",
      },
      {
        type: "image",
        src: programs.education[1],
        alt: "A student with learning supplies",
        caption: "The difference between dropping out and staying in class often comes down to the simplest things.",
      },
      {
        type: "list",
        items: [
          "Books, notebooks and stationery for students who cannot afford them.",
          "School uniforms and bags that give children the dignity to walk into class.",
          "Exam fees and tuition support so no student is left behind.",
          "Mentoring and encouragement to help children believe in themselves.",
        ],
      },
      {
        type: "subheading",
        text: "When you invest in a child, you invest in a future",
      },
      {
        type: "paragraph",
        text: "An educated child grows into an adult who can feed their family, contribute to their community and break the cycle of poverty. Every dollar spent on education returns tenfold — not just in economic terms, but in human dignity and hope.",
      },
      {
        type: "quote",
        text: "I wanted to study but my family could not afford it. Now I can go to school every day because someone believed in me.",
        cite: "Student supported by Education Aid",
      },
      {
        type: "callout",
        title: "Your donation at work",
        text: "Just ৳500 can provide a student with books and supplies for an entire term. ৳2,000 covers uniform, shoes and bags. Every amount, no matter how small, keeps a child learning.",
      },
    ],
    meta: [
      { label: "Focus", value: "Books, uniforms, fees & mentoring" },
      { label: "Who it helps", value: "Students from financially struggling families" },
      { label: "Impact", value: "Each student supported for a full academic year" },
      { label: "Status", value: "Ongoing — accepting donations" },
    ],
  },
  {
    slug: "schools",
    image: hero.schools,
    tag: "Education",
    title: "School Support",
    short:
      "We strengthen under-resourced schools across Bangladesh — from classroom essentials to the buildings children learn in, because every community deserves a school that works.",
    intro:
      "In many villages, the local school is more than a building. It is a symbol of hope, a gathering place, and often the only path out of poverty for an entire generation. Yet thousands of these schools struggle to stay open — lacking basic supplies, safe classrooms and trained teachers. We work alongside communities to give these schools the support they need to truly serve their children.",
    blocks: [
      {
        type: "heading",
        text: "Building stronger schools, stronger communities",
      },
      {
        type: "paragraph",
        text: "When a school has proper materials, safe walls and caring teachers, something remarkable happens. Children begin to thrive. Parents feel proud. And entire villages start to believe that a better future is possible. Our School Support program works at the grassroots level — partnering with local communities to identify what each school needs most.",
      },
      {
        type: "image",
        src: programs.schools[1],
        alt: "Children in their school environment",
        caption: "These children attend one of the schools we support — their smiles tell the whole story.",
      },
      {
        type: "image",
        src: programs.schools[3],
        alt: "Young students in class",
        caption: "A classroom where children are learning, growing and dreaming of what they can become.",
      },
      {
        type: "image",
        src: programs.schools[5],
        alt: "School children together",
        caption: "Supporting one school means supporting hundreds of children and their families.",
      },
      {
        type: "list",
        items: [
          "Classroom materials — books, charts, blackboards and learning tools.",
          "Infrastructure support — desks, fans, lighting and safe drinking water.",
          "Teacher training and salary assistance for community schools.",
          "Emergency repairs to keep schools safe and functional.",
        ],
      },
      {
        type: "subheading",
        text: "Communities that invest in their own children",
      },
      {
        type: "paragraph",
        text: "Our approach is simple: we work with communities, not for them. Parents contribute labor, local leaders help coordinate, and teachers receive the training they need. When everyone has a stake in the outcome, the results last for generations.",
      },
      {
        type: "quote",
        text: "Before this program, our school had no desks, no fans, and children sat on the floor. Now it feels like a real place of learning.",
        cite: "Head teacher, supported school",
      },
      {
        type: "callout",
        title: "How your support helps",
        text: "Your donation can provide desks for a classroom, fans for hot days, or emergency repairs that keep a school open. Every contribution directly improves a child's learning environment.",
      },
    ],
    meta: [
      { label: "Focus", value: "School resources, facilities & teacher support" },
      { label: "Who it helps", value: "Under-resourced schools and their students" },
      { label: "Branches", value: "Savar, Sirajgonj, Shatkhira, Bogura" },
      { label: "Status", value: "Ongoing — 4 active branches" },
    ],
    hasBranches: true,
  },
  {
    slug: "emergency-relief",
    image: hero.relief,
    tag: "Emergency",
    title: "Emergency Relief",
    short:
      "When disaster strikes without warning, we move fast — delivering food, shelter and hope to families who have lost everything in hours.",
    intro:
      "One moment, a family is eating dinner together. The next, their home is underwater. In Bangladesh, floods, cyclones and fires can destroy a lifetime of work in a single night. When disaster strikes, our Emergency Relief teams are among the first on the ground — because we believe that in the darkest hours, no one should face the darkness alone.",
    blocks: [
      {
        type: "heading",
        text: "First responders in the moments that matter",
      },
      {
        type: "paragraph",
        text: "The first 48 hours after a disaster determine how much dignity a family keeps. Our local volunteers know their communities — they know which houses are lowest, which families are most vulnerable, and where help is needed first. This local knowledge means aid reaches people faster and with greater care.",
      },
      {
        type: "image",
        src: programs.relief[1],
        alt: "Relief being prepared for the community",
        caption: "Each package contains enough food and essentials to sustain a family for days.",
      },
      {
        type: "image",
        src: programs.relief[3],
        alt: "Delivering relief to affected families",
        caption: "Our volunteers wade through floodwaters to reach families who cannot reach us.",
      },
      {
        type: "list",
        items: [
          "Emergency food packages — rice, lentils, oil and essential staples.",
          "Clean drinking water and oral saline to prevent waterborne illness.",
          "Blankets, mosquito nets and basic household essentials.",
          "Temporary shelter materials for families who lost their homes.",
        ],
      },
      {
        type: "subheading",
        text: "From crisis to recovery",
      },
      {
        type: "paragraph",
        text: "Emergency relief is just the beginning. We stay with communities through the long recovery — helping rebuild homes, restore livelihoods and regain the confidence that disaster takes away. Because true relief doesn't end when the floodwaters recede.",
      },
      {
        type: "quote",
        text: "When we lost everything in the flood, they were the first to arrive. They didn't just bring food — they brought back our hope.",
        cite: "Relief recipient, Sylhet",
      },
      {
        type: "callout",
        title: "Your gift saves lives",
        text: "Just ৳1,000 can provide a family with emergency food and water for a week. ৳5,000 can supply shelter materials. When disaster strikes, your donation is the difference between despair and hope.",
      },
    ],
    meta: [
      { label: "Focus", value: "Emergency food, water, shelter & recovery" },
      { label: "Who it helps", value: "Families affected by floods, cyclones and fires" },
      { label: "Response time", value: "Within 24-48 hours" },
      { label: "Status", value: "On-call year round" },
    ],
  },
  {
    slug: "food-support",
    image: hero.food,
    tag: "Food",
    title: "Food Support",
    short:
      "No family should go to bed hungry. We provide warm meals and food packages to those who need them most — because hunger is a problem we can solve.",
    intro:
      "Hunger is not just an empty stomach. It is a child who cannot concentrate in school. It is a mother who skips meals so her children can eat. It is a father who works twelve hours but still cannot put enough on the table. Our Food Support program exists because in a world of plenty, no one should have to choose between eating and other basics.",
    blocks: [
      {
        type: "heading",
        text: "Dignity starts with a meal",
      },
      {
        type: "paragraph",
        text: "We believe that food is not a luxury — it is a fundamental right. Our food program reaches families at their most vulnerable: the elderly who live alone, daily wage earners whose income has stopped, and mothers struggling to feed their children. Every meal we serve is prepared with care and delivered with respect.",
      },
      {
        type: "image",
        src: programs.food[0],
        alt: "Food prepared for the community",
        caption: "A warm meal, prepared with dignity, served with care.",
      },
      {
        type: "image",
        src: programs.food[1],
        alt: "Sharing a warm meal",
        caption: "When communities come together to share food, everyone is strengthened.",
      },
      {
        type: "list",
        items: [
          "Warm cooked meals for families facing hunger.",
          "Food packages with rice, lentils, oil and essential staples.",
          "Special attention to children, the elderly and those with illness.",
          "Regular distributions in communities with chronic food insecurity.",
        ],
      },
      {
        type: "subheading",
        text: "Food is the foundation of everything",
      },
      {
        type: "paragraph",
        text: "When a family's food needs are met, everything else becomes possible. Children return to school with energy to learn. Parents can focus on finding work instead of worrying about their next meal. Health improves. Hope returns. Food is not the end goal — it is the beginning of recovery.",
      },
      {
        type: "quote",
        text: "For the first time in months, my children went to bed with full stomachs. I cannot describe what that means to a mother.",
        cite: "Food support recipient",
      },
      {
        type: "callout",
        title: "Your donation feeds a family",
        text: "Just ৳500 provides a family with food for a week. ৳2,000 supplies a month's worth of staples. Your generosity turns empty plates into full ones.",
      },
    ],
    meta: [
      { label: "Focus", value: "Cooked meals & food packages" },
      { label: "Who it helps", value: "Families facing hunger and food insecurity" },
      { label: "Impact", value: "Each package feeds a family for up to a week" },
      { label: "Status", value: "Ongoing — daily distributions" },
    ],
  },
  {
    slug: "housing-shelter",
    image: hero.housing,
    tag: "Shelter",
    title: "Housing & Shelter",
    short:
      "A home is more than four walls — it is safety, dignity and the starting point for rebuilding a life. We help families rebuild after loss.",
    intro:
      "When a family loses their home to fire or flood, they lose more than a building. They lose their security, their privacy, their sense of belonging. Our Housing & Shelter program gives families a safe place to start again — building simple, sturdy homes and supporting them through the long process of recovery.",
    blocks: [
      {
        type: "heading",
        text: "A home is the starting point of everything",
      },
      {
        type: "paragraph",
        text: "Consider what changes when a family has a safe home. Children return to school. Parents can focus on work instead of survival. The elderly feel secure in their final years. A home is not just shelter — it is the foundation on which all other progress is built.",
      },
      {
        type: "image",
        src: programs.housing[1],
        alt: "Housing construction in progress",
        caption: "Every brick laid represents a family's hope restored.",
      },
      {
        type: "image",
        src: programs.housing[3],
        alt: "A rebuilt family home",
        caption: "A simple, sturdy home that lets a family live with dignity again.",
      },
      {
        type: "image",
        src: programs.housing[4],
        alt: "Community working on housing together",
        caption: "When we build with the community, they take ownership of the result.",
      },
      {
        type: "subheading",
        text: "Each home is a story of generosity",
      },
      {
        type: "paragraph",
        text: "Every home we build is made possible by individuals who believe that a family deserves better. We document each donation and its impact — so supporters can see exactly how their contribution transformed a family's life. Whether it is providing materials for a roof or funding the construction of an entire home, every act of generosity creates ripples that last for generations.",
      },
      {
        type: "list",
        items: [
          "Rebuilding simple, sturdy homes for families who lost shelter.",
          "Repairs for homes damaged by fire and natural disasters.",
          "Prioritizing the most vulnerable — the elderly, widows and families with young children.",
          "Building with local materials and community labor for long-term sustainability.",
        ],
      },
      {
        type: "quote",
        text: "After the fire destroyed our home, I thought we had nothing left. They built us a house — and gave us back the future I thought we lost.",
        cite: "Housing support recipient",
      },
      {
        type: "callout",
        title: "Gift a home, change a life",
        text: "You can fund an entire home, or contribute towards materials like tin, bricks and timber. Every donation, large or small, becomes a foundation for a family's new beginning.",
      },
    ],
    meta: [
      { label: "Focus", value: "New homes & repairs for families in need" },
      { label: "Who it helps", value: "Families who lost shelter to fire or disaster" },
      { label: "Impact", value: "Each home is documented with photos & updates" },
      { label: "Status", value: "Ongoing — accepting donations" },
    ],
  },
  {
    slug: "medical-aid",
    image: hero.healthcare,
    tag: "Health",
    title: "Medical Aid",
    short:
      "A single medical emergency can push a family into crisis. We help vulnerable people access the treatment and care they cannot otherwise afford.",
    intro:
      "Imagine watching your child suffer, knowing there is medicine that could help — but knowing you cannot afford it. This is the heartbreak our Medical Aid program addresses every single day. In Bangladesh, a single illness or accident can push an entire family into poverty. We stand between families and that devastating choice.",
    blocks: [
      {
        type: "heading",
        text: "Because no one should have to choose between health and survival",
      },
      {
        type: "paragraph",
        text: "Our Medical Aid program helps the most vulnerable access essential treatment — covering medicines, hospital care and procedures that families cannot afford on their own. We focus on practical, life-saving support for children, mothers and the elderly who would otherwise go without.",
      },
      {
        type: "image",
        src: programs.healthcare[1],
        alt: "Providing medical care to a community member",
        caption: "Essential treatment and medicines for those who need them most.",
      },
      {
        type: "image",
        src: programs.healthcare[3],
        alt: "Receiving healthcare support",
        caption: "Access to care at the exact moment it can make the difference.",
      },
      {
        type: "list",
        items: [
          "Help with the cost of essential medicines and treatment.",
          "Support for hospital stays and surgical procedures families cannot afford.",
          "Emergency medical assistance for the most critical cases.",
          "Care for children, mothers and the elderly who are most at risk.",
        ],
      },
      {
        type: "subheading",
        text: "Health is the foundation of a hopeful life",
      },
      {
        type: "paragraph",
        text: "When someone falls ill, it affects the entire family — children who cannot attend school, parents who cannot work, and households pushed to the edge. By helping people access the care they need, we help them regain not just their health, but their ability to live full, productive lives.",
      },
      {
        type: "quote",
        text: "The hospital said if we waited any longer, we would lose our daughter. Your support got her the treatment she needed. We will never forget it.",
        cite: "Parent of child supported by Medical Aid",
      },
      {
        type: "callout",
        title: "Your gift is a lifeline",
        text: "Just ৳2,000 can cover essential medicines. ৳10,000 can fund a life-saving procedure. Every donation directly translates into treatment, relief and recovered families.",
      },
    ],
    meta: [
      { label: "Focus", value: "Medicines & essential treatment" },
      { label: "Who it helps", value: "Children, mothers & the elderly in need" },
      { label: "Impact", value: "Direct coverage of medical costs" },
      { label: "Status", value: "Ongoing — urgent cases prioritised" },
    ],
  },
  {
    slug: "medical-camps",
    image: hero.medicalCamp,
    tag: "Health",
    title: "Medical Camps",
    short:
      "Free health check-ups and medicines brought directly to the community — for villages where the nearest clinic is hours away.",
    intro:
      "For thousands of families, the nearest doctor is a day's journey away. A fever goes untreated. High blood pressure goes undetected. A preventable problem becomes a crisis. Our Medical Camps bring free healthcare directly to the communities who need it — transforming access to medicine in a single day.",
    blocks: [
      {
        type: "heading",
        text: "Bringing the clinic to the doorstep",
      },
      {
        type: "paragraph",
        text: "Each medical camp is a full care unit set up in a community center, mosque or school. Volunteer doctors and nurses donate their time to provide free consultations, distribute essential medicines, and offer health education. For many patients, this is the first time they have ever seen a doctor.",
      },
      {
        type: "image",
        src: programs.medicalCamp[1],
        alt: "A medical camp serving the community",
        caption: "Free check-ups and treatment at a community medical camp.",
      },
      {
        type: "image",
        src: programs.medicalCamp[2],
        alt: "Volunteer doctors attending patients",
        caption: "Compassionate doctors giving their time so others can access care.",
      },
      {
        type: "image",
        src: programs.medicalCamp[3],
        alt: "Patients receiving care and medicines",
        caption: "Medicines and advice handed out freely to those in need.",
      },
      {
        type: "list",
        items: [
          "Free general health check-ups for people of all ages.",
          "Essential medicines distributed free at every camp.",
          "Health education on prevention, hygiene and nutrition.",
          "Referrals for patients needing follow-up care.",
        ],
      },
      {
        type: "subheading",
        text: "One day that changes everything",
      },
      {
        type: "paragraph",
        text: "A single day of medical care can detect a silent disease, treat a child's infection, or reassure an elderly parent. Beyond the camp, patients are connected to ongoing care so the impact lasts long after the tents come down.",
      },
      {
        type: "quote",
        text: "I am 70 years old and this is the first time I saw a doctor. They told me I have diabetes and gave me medicine for free.",
        cite: "Elderly patient at a medical camp",
      },
      {
        type: "callout",
        title: "Fund a camp, reach a community",
        text: "You can sponsor an entire medical camp — bringing free care and medicines to hundreds of people who have no other access to healthcare. Contact us to learn more.",
      },
    ],
    meta: [
      { label: "Focus", value: "Free check-ups, medicines & health education" },
      { label: "Who it helps", value: "Communities without nearby clinics" },
      { label: "Reach", value: "Hundreds of patients per camp" },
      { label: "Status", value: "Regular camps year round" },
    ],
  },
  {
    slug: "water-sanitation",
    image: hero.water,
    tag: "Water",
    title: "Tube Wells & Sanitation",
    short:
      "Clean water is life. We install and repair tube wells and toilets so families can drink safely and live with dignity.",
    intro:
      "Every day, women and children in rural communities walk miles to collect water — water that is often unsafe to drink. Every year, thousands of children in Bangladesh die from waterborne diseases that are entirely preventable. Our Tube Wells & Sanitation program brings safe water and clean toilets directly to the families who need them most.",
    blocks: [
      {
        type: "heading",
        text: "A basic right, still denied to millions",
      },
      {
        type: "paragraph",
        text: "Safe water is so basic that we take it for granted. But for many families, a clean tube well is the difference between health and chronic illness, between a child attending school and one too sick to leave home. We install tube wells so families can drink safely — and build hygienic toilets that protect health and preserve dignity.",
      },
      {
        type: "image",
        src: programs.water[1],
        alt: "A new tube well installed for a family",
        caption: "The moment a family gets clean water close to home changes everything.",
      },
      {
        type: "image",
        src: programs.water[2],
        alt: "Installing water and sanitation infrastructure",
        caption: "Built to last, with quality materials tested for safety.",
      },
      {
        type: "list",
        items: [
          "Installing and repairing tube wells for safe drinking water.",
          "Building hygienic toilets for households and schools.",
          "Testing water quality to ensure it is truly safe to drink.",
          "Working with communities to maintain facilities for years.",
        ],
      },
      {
        type: "subheading",
        text: "Built to last, owned by the community",
      },
      {
        type: "paragraph",
        text: "We don't just install and leave. We work with each community to ensure the tube wells and toilets are properly maintained. A facility that lasts for years serves dozens of families — multiplying the impact of your donation many times over.",
      },
      {
        type: "quote",
        text: "Before, we had to walk two kilometers for water that made our children sick. Now there is clean water right outside our door.",
        cite: "Resident of a community we supported",
      },
      {
        type: "callout",
        title: "Your gift brings safe water",
        text: "Just ৳6,000 can install a tube well serving an entire family. ৳15,000 can provide a hygienic toilet. These are gifts that protect health for years to come.",
      },
    ],
    meta: [
      { label: "Focus", value: "Tube wells & hygienic toilets" },
      { label: "Who it helps", value: "Communities without safe water" },
      { label: "Impact", value: "Facilities serve families for years" },
      { label: "Status", value: "Ongoing" },
    ],
  },
  {
    slug: "sewing-machine-support",
    image: hero.sewing,
    tag: "Livelihoods",
    title: "Sewing Machine Support",
    short:
      "A sewing machine is a path to steady income — giving women the tools to sew their way to independence.",
    intro:
      "For a woman living in poverty, a sewing machine represents far more than a tool — it is the difference between dependence and independence, between survival and a future she controls. We provide machines and training so women can earn, provide for their families and build a dignified life on their own terms.",
    blocks: [
      {
        type: "heading",
        text: "A machine that stitches together a future",
      },
      {
        type: "paragraph",
        text: "With a sewing machine and a little training, a woman can begin earning from home — caring for her children while she works, and gaining the confidence that comes from providing for her family. For many women, this is the first time they have had control over their own income.",
      },
      {
        type: "image",
        src: programs.sewing[1],
        alt: "A woman at her sewing machine",
        caption: "A sewing machine becomes a source of steady, dignified income.",
      },
      {
        type: "image",
        src: programs.sewing[2],
        alt: "Sewing work in progress",
        caption: "Skills that turn a machine into a livelihood.",
      },
      {
        type: "list",
        items: [
          "Providing new sewing machines to women in need.",
          "Basic sewing and tailoring training to build confidence.",
          "Support to begin and sustain a small tailoring business.",
          "Ongoing mentorship for business growth.",
        ],
      },
      {
        type: "subheading",
        text: "Self-reliance, stitched together",
      },
      {
        type: "paragraph",
        text: "This is about more than an object. It is about a woman's right to earn, to have a purpose, and to stand on her own. When we give a woman the tools and skills she needs, we don't just help her — we help her entire family, and we demonstrate that dignity is achievable.",
      },
      {
        type: "quote",
        text: "Now I can earn for my family from my own home. My children look at me differently — I have become the person who takes care of us.",
        cite: "Woman supported by Sewing Machine program",
      },
      {
        type: "callout",
        title: "Empower a woman, empower a family",
        text: "Just ৳8,000 can provide a sewing machine and training that empowers a woman to earn for a lifetime. This is an investment that keeps giving.",
      },
    ],
    meta: [
      { label: "Focus", value: "Sewing machines & tailoring training" },
      { label: "Who it helps", value: "Women seeking self-reliance" },
      { label: "Impact", value: "Lifetime income opportunity" },
      { label: "Status", value: "Ongoing" },
    ],
  },
  {
    slug: "shop-support",
    image: hero.shop,
    tag: "Livelihoods",
    title: "Shop Support",
    short:
      "A small shop can be a family's entire livelihood. We help struggling households start or restock shops to build steady income.",
    intro:
      "For many families, a small corner shop is the difference between poverty and stability. The problem is that starting one takes capital most families simply don't have. Our Shop Support program steps in at that critical moment — helping struggling households open or restock a shop so they can earn a dependable, dignified income.",
    blocks: [
      {
        type: "heading",
        text: "A small shop, a steady future",
      },
      {
        type: "paragraph",
        text: "With a little capital at exactly the right moment, a family can turn their skills and effort into a regular income. A shop provides not just money, but purpose, independence and the pride of running your own business. We support those who are ready to work for their future.",
      },
      {
        type: "image",
        src: programs.shop[1],
        alt: "A family-run shop",
        caption: "A small shop built into a reliable livelihood.",
      },
      {
        type: "image",
        src: programs.shop[2],
        alt: "Goods for a family shop",
        caption: "Helping families stock and grow a small business.",
      },
      {
        type: "list",
        items: [
          "Startup support to open or restock a small shop.",
          "Initial stock and essential goods to begin trading.",
          "Guidance on pricing, customers and growing the business.",
          "Follow-up support to help the shop become self-sustaining.",
        ],
      },
      {
        type: "subheading",
        text: "The most lasting form of help",
      },
      {
        type: "paragraph",
        text: "Income a family earns itself is the most lasting help we can give. It sustains them, builds their confidence and frees them from dependence. A successful shop isn't just a business — it's a family's path to security and dignity.",
      },
      {
        type: "quote",
        text: "I never imagined I could own a shop. Now my children can eat every day, and I have a future I'm proud of.",
        cite: "Shop owner supported by our program",
      },
      {
        type: "callout",
        title: "Start a business, change a family",
        text: "Your donation helps a family start or restock a shop — giving them the tools to build a permanent, dignified livelihood. This is help that lasts a lifetime.",
      },
    ],
    meta: [
      { label: "Focus", value: "Shop start-up & initial stock" },
      { label: "Who it helps", value: "Struggling households ready to work" },
      { label: "Impact", value: "Permanent income opportunity" },
      { label: "Status", value: "Ongoing" },
    ],
  },
  {
    slug: "van-rickshaw-support",
    image: hero.vanRickshaw,
    tag: "Livelihoods",
    title: "Van & Rickshaw Support",
    short:
      "Helping hard-working people earn through their own van or rickshaw — so they keep more of what they earn.",
    intro:
      "Pulling a van or rickshaw is honest, demanding work. Yet for many workers, the vehicle itself is out of reach — and they end up paying rent to someone else, keeping only a fraction of their hard-earned money. We help struggling earners obtain their own vehicle, so they can build a stable income and keep the fruit of their labor.",
    blocks: [
      {
        type: "heading",
        text: "A vehicle is a path out of poverty",
      },
      {
        type: "paragraph",
        text: "When a worker owns their own van or rickshaw, everything changes. They work the same long hours, but now they keep the earnings. They gain independence, stability and the dignity of building something of their own — instead of enriching someone else.",
      },
      {
        type: "image",
        src: programs.vanRickshaw[1],
        alt: "A van and rickshaw provided for earning",
        caption: "A worker with his own vehicle — a steady way to support his family.",
      },
      {
        type: "image",
        src: programs.vanRickshaw[2],
        alt: "A rickshaw ready for work",
        caption: "Earning power placed in the hands of those who work hardest.",
      },
      {
        type: "list",
        items: [
          "Providing vans and rickshaws to struggling daily earners.",
          "Helping workers own their vehicle and keep more of their earnings.",
          "Support for a dependable, daily income.",
          "Building long-term financial independence.",
        ],
      },
      {
        type: "subheading",
        text: "Dignity in honest work",
      },
      {
        type: "paragraph",
        text: "There is no work more honest than earning your living through physical labor. But dignity comes not just from the work itself, but from keeping what you earn. When a worker owns his vehicle, he gains independence, stability and pride — for himself and his family.",
      },
      {
        type: "quote",
        text: "I used to rent my rickshaw and give half my earnings to the owner. Now it's mine. My family can finally save a little.",
        cite: "Rickshaw driver supported by our program",
      },
      {
        type: "callout",
        title: "Give a vehicle, build a livelihood",
        text: "Your donation can help a hard-working person own their own van or rickshaw — a dependable, dignified route to supporting their family.",
      },
    ],
    meta: [
      { label: "Focus", value: "Vans & rickshaws" },
      { label: "Who it helps", value: "Daily-wage earners" },
      { label: "Impact", value: "Long-term income independence" },
      { label: "Status", value: "Ongoing" },
    ],
  },
  {
    slug: "wheelchair-support",
    image: hero.wheelchair,
    tag: "Health",
    title: "Wheelchair Support",
    short:
      "Mobility is independence. We provide wheelchairs to people with disabilities who have no other way to move freely.",
    intro:
      "For a person with a disability, a wheelchair is the key to everything — to leaving their house, to work, to education, to participating fully in their community. Yet for many families, a wheelchair is a luxury they simply cannot afford. Our program provides wheelchairs to those who need them most, and in doing so, restores much more than movement.",
    blocks: [
      {
        type: "heading",
        text: "Freedom on wheels",
      },
      {
        type: "paragraph",
        text: "A wheelchair might look like equipment, but for the person who receives it, it is freedom. It is the ability to go outside after years of being confined. It is the chance to work, study, worship and connect with loved ones. For many people, a wheelchair transforms their entire life.",
      },
      {
        type: "image",
        src: programs.wheelchair[1],
        alt: "A wheelchair provided to a community member",
        caption: "Mobility and independence restored.",
      },
      {
        type: "image",
        src: programs.wheelchair[2],
        alt: "Supporting a person with a new wheelchair",
        caption: "A wheelchair that lets someone live with dignity and freedom.",
      },
      {
        type: "list",
        items: [
          "Providing wheelchairs to people with limited mobility.",
          "Prioritizing those with the greatest need and least means.",
          "Support for children, the elderly and those disabled by illness or accident.",
          "Choosing durable, well-fitted wheelchairs that last.",
        ],
      },
      {
        type: "subheading",
        text: "More than mobility — dignity and belonging",
      },
      {
        type: "paragraph",
        text: "With a wheelchair, a person can again contribute to their family and community. They can attend school, pursue a livelihood and take part in daily life. They regain not just movement, but their dignity and place in the world.",
      },
      {
        type: "quote",
        text: "For five years I couldn't leave my room. With this wheelchair, I went outside for the first time — I felt alive again.",
        cite: "Wheelchair recipient",
      },
      {
        type: "callout",
        title: "Give the gift of mobility",
        text: "Just ৳9,000 can provide a durable wheelchair that restores a person's freedom, independence and participation in life. This is a gift that transforms everything.",
      },
    ],
    meta: [
      { label: "Focus", value: "Wheelchairs for people with mobility needs" },
      { label: "Who it helps", value: "People with disabilities & limited mobility" },
      { label: "Impact", value: "Restores independence & participation" },
      { label: "Status", value: "Ongoing" },
    ],
  },
  {
    slug: "community-programs",
    image: hero.community,
    tag: "Community",
    title: "Community & Religious Programs",
    short:
      "Bringing people together — sharing warmth, support and belonging at the heart of community and faith life.",
    intro:
      "Some of the most powerful moments of care happen not in our offices, but in the gatherings where communities already come together. Through mosques, schools and neighborhood events, we reach those who might otherwise be overlooked — the elderly, the isolated and the poorest among us. These programs remind us that no one should face life's challenges alone.",
    blocks: [
      {
        type: "heading",
        text: "Strength in togetherness",
      },
      {
        type: "paragraph",
        text: "Many of our most overlooked neighbors live right around the corner — the elderly who are alone, families quietly struggling, and people who have fallen through every safety net. By working through the gatherings where communities already meet, we bring warmth and support directly to those who need it most.",
      },
      {
        type: "image",
        src: programs.community[1],
        alt: "A community gathering",
        caption: "Sharing warmth and support at the heart of the community.",
      },
      {
        type: "image",
        src: programs.community[2],
        alt: "People together in the community",
        caption: "Community programs that bring people together.",
      },
      {
        type: "list",
        items: [
          "Shared meals and gatherings that bring neighbors together.",
          "Support for the elderly, the isolated and those in silent need.",
          "Religious and community events that strengthen belonging.",
          "Emergency support distributed where communities gather.",
        ],
      },
      {
        type: "subheading",
        text: "Care that reaches everyone",
      },
      {
        type: "paragraph",
        text: "By working through community and faith gatherings, we reach people who might never approach an NGO for help — often the very people who need it most. In doing so, we remind every member of the community that they are seen, valued and never alone.",
      },
      {
        type: "quote",
        text: "I've lived alone since my husband passed. These gatherings give me something to look forward to — and remind me I'm part of a family.",
        cite: "Elderly member of the community",
      },
      {
        type: "callout",
        title: "Be part of the community",
        text: "Your contribution helps us bring warmth, food and support to the heart of the community — reaching the people who need it most, right where they already gather.",
      },
    ],
    meta: [
      { label: "Focus", value: "Community support & shared gatherings" },
      { label: "Who it helps", value: "Elderly, isolated & vulnerable community members" },
      { label: "Approach", value: "Reaching people where they gather" },
      { label: "Status", value: "Ongoing" },
    ],
  },
];

export const activities: Activity[] = activitiesRaw.map((a) => ({
  ...a,
  galleryAlbum: a.slug,
}));

export const activityCount = activities.length;

export function getActivity(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}

const folderMap: Record<string, string[]> = {
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

export function getActivityGalleryImages(slug: string): string[] {
  const folders = folderMap[slug];
  if (!folders) return [];
  return folders.flatMap((f) => programs[f as keyof typeof programs] ?? []).slice(
    0,
    4
  );
}

export const schoolBranches: SchoolBranch[] = [
  {
    slug: "savar",
    name: "Savar Branch",
    location: "Savar, Dhaka",
    description:
      "Our Savar branch serves children from the surrounding communities — many living on the margins of the capital. From classroom materials to infrastructure support, we work with local schools and families to keep students learning in a safe, caring environment.",
    image: programs.schools[0],
    stats: [
      { label: "Students supported", value: "200+" },
      { label: "Community schools", value: "3" },
      { label: "Program start", value: "2019" },
    ],
  },
  {
    slug: "sirajgonj",
    name: "Sirajgonj Branch",
    location: "Sirajgonj",
    description:
      "In the riverine district of Sirajgonj, many children lose access to education during seasonal floods. Our branch works with flood-affected families, providing materials, emergency learning support and helping schools recover so children can return to class as quickly as possible.",
    image: programs.schools[1],
    stats: [
      { label: "Students supported", value: "150+" },
      { label: "Community schools", value: "2" },
      { label: "Program start", value: "2018" },
    ],
  },
  {
    slug: "shatkhira",
    name: "Shatkhira Branch",
    location: "Shatkhira",
    description:
      "Located in the coastal southwest, our Shatkhira branch supports schools in communities frequently affected by cyclones and saline water intrusion. We help keep these resilient communities' children in school despite challenging conditions.",
    image: programs.schools[2],
    stats: [
      { label: "Students supported", value: "180+" },
      { label: "Community schools", value: "3" },
      { label: "Program start", value: "2020" },
    ],
  },
  {
    slug: "bogura",
    name: "Bogura Branch",
    location: "Bogura",
    description:
      "In the northwest, our Bogura branch focuses on under-resourced schools and children from families facing economic hardship. We provide the resources and encouragement these students need to believe in their own potential.",
    image: programs.schools[3],
    stats: [
      { label: "Students supported", value: "160+" },
      { label: "Community schools", value: "2" },
      { label: "Program start", value: "2021" },
    ],
  },
];

export function getSchoolBranch(slug: string): SchoolBranch | undefined {
  return schoolBranches.find((b) => b.slug === slug);
}
