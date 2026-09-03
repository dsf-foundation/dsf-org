import { img } from "@/data/images";
import type { RichBlock } from "@/components/ui/rich-content";

export type BlogPost = {
  slug: string;
  thumbnail: string;
  title: string;
  summary: string;
  category: string;
  blocks: RichBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "chittagong-flood-relief-2026",
    thumbnail: img.stories.river,
    category: "Emergency Relief",
    title: "Standing with flood-affected families in greater Chittagong",
    summary:
      "When severe flooding submerged large areas of the region, our teams moved quickly to reach families who had lost everything — delivering food, clean water and essentials in the first critical days.",
    blocks: [
      {
        type: "heading",
        text: "Moving in the first critical days",
      },
      {
        type: "paragraph",
        text: "The window between emergency and recovery is narrow. In the immediate aftermath, families need food, clean drinking water and essentials — not promises. Our teams prioritised those least able to help themselves: elderly households, families with young children and those who had lost everything in the flood.",
      },
      {
        type: "image",
        src: img.programs.relief,
        alt: "Relief packages reaching a flood-affected community",
        caption: "Essential packages arriving in the first critical days.",
      },
      {
        type: "image",
        src: img.programs.food,
        alt: "Food and essentials being distributed",
        caption: "Delivering to families who lost everything overnight.",
      },
      {
        type: "quote",
        text: "When people lose everything in a single night, the first days decide how much dignity they keep.",
      },
      {
        type: "subheading",
        text: "What we distributed",
      },
      {
        type: "list",
        items: [
          "Essential food packages — rice, lentils, oil and potatoes — to tide families over.",
          "Oral saline and clean-water essentials to guard against illness.",
          "Basic household necessities for those who lost their homes and stores.",
        ],
      },
      {
        type: "callout",
        title: "Relief — then recovery",
        text: "Immediate relief is only the beginning. As the water recedes, we stay with communities through recovery and rehabilitation, helping families rebuild what the flood took away.",
      },
      {
        type: "paragraph",
        text: "None of this would have been possible without the speed and trust of our supporters. When asked to move quickly, they responded — and that meant we could reach families while the need was most acute.",
      },
      {
        type: "paragraph",
        text: "The water has since receded, but the work has not. Our teams remain in the affected districts, coordinating with local volunteers to make sure recovery reaches the families who need it most — not just those who are easiest to find.",
      },
    ],
  },
  {
    slug: "clean-water-communities",
    thumbnail: img.programs.water,
    category: "Water",
    title: "Why clean water changes everything for a community",
    summary:
      "For families without a reliable water source, the day is shaped by the search for water. Here's how access to clean water transforms health, time and opportunity.",
    blocks: [
      {
        type: "heading",
        text: "The hidden cost of a long walk for water",
      },
      {
        type: "paragraph",
        text: "It is easy to forget how much of daily life bends around water. For families without a reliable source, the day is organised around the search for it — and the walk is rarely short. That time has a real cost: it is time not spent working, studying or resting.",
      },
      {
        type: "image",
        src: img.stories.kidsClass,
        alt: "Children at school in their community",
        caption: "With water close by, children can attend school instead of fetching it.",
      },
      {
        type: "image",
        src: img.stories.hands,
        alt: "Hands gently cupped around clean water",
        caption: "Safe water means health, time and dignity returned to families.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Health improves — contaminated water is a leading cause of preventable illness.",
          "Children, especially girls, can attend school regularly instead of making water runs.",
          "Families regain hours each day for work, study and care.",
          "Dignity returns — no one should have to ration water or rely on unsafe sources.",
        ],
      },
      {
        type: "quote",
        text: "A single reliable water source is one of the most direct and lasting improvements we can make to a family's life.",
      },
      {
        type: "subheading",
        text: "Built with communities, for the long term",
      },
      {
        type: "paragraph",
        text: "We install and repair wells and water systems — but always in partnership with the communities who will maintain them for years to come. A well that stops working in a season is a failure; one that is owned and maintained by its community is a lasting asset.",
      },
      {
        type: "callout",
        title: "Our approach",
        text: "Clean water is a foundation. We work with local committees so every source we build or repair keeps serving families long after our teams move on.",
      },
      {
        type: "paragraph",
        text: "The transformation is often quiet, but it is real. Families notice it in fewer illnesses, more regular schooling and a little more time in every day. For us, that is what sustainable change looks like.",
      },
    ],
  },
  {
    slug: "women-entrepreneurs",
    thumbnail: img.programs.women,
    category: "Livelihoods",
    title: "Self-reliance through small enterprise",
    summary:
      "A little capital and the right training can transform a family's circumstances. We share how livelihood support is helping women build stable, independent income.",
    blocks: [
      {
        type: "heading",
        text: "From support to self-reliance",
      },
      {
        type: "paragraph",
        text: "A modest amount of startup capital, combined with practical training, gives someone the tools and confidence to succeed. It is a small intervention at the right moment — and it can permanently change a family's trajectory.",
      },
      {
        type: "image",
        src: img.programs.skills,
        alt: "Women learning practical skills",
        caption: "Training matched to real market demand gives people the tools to succeed.",
      },
      {
        type: "image",
        src: img.programs.farming,
        alt: "A woman tending crops as part of a livelihood",
        caption: "A steady, independent income that lets families provide for themselves.",
      },
      {
        type: "subheading",
        text: "What a small enterprise makes possible",
      },
      {
        type: "list",
        items: [
          "A steady, independent income that is not dependent on charity.",
          "The ability to pay for children's education and healthcare.",
          "Savings and security against a future emergency.",
          "Confidence — the sense of being able to provide for one's own family.",
        ],
      },
      {
        type: "quote",
        text: "Every business is a step toward self-reliance — for the individual, their family and the wider community.",
      },
      {
        type: "paragraph",
        text: "We focus on training that matches real market demand, and on support that stays with people through the difficult early months of running a business. The result is enterprises that last, not grants that are spent and forgotten.",
      },
      {
        type: "callout",
        title: "Why it matters",
        text: "Self-reliance is the most dignified form of help. When a person can earn, they are no longer waiting for support — they are building their own future.",
      },
      {
        type: "paragraph",
        text: "This work is a reminder that lasting change is not always dramatic. Sometimes it looks like a small shop, a sewing machine, or a steady income — and that is exactly the kind of change we want to see more of.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}
