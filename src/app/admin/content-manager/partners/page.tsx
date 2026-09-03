import MarqueeManager from "@/app/admin/content-manager/components/marquee-manager";

export default function PartnersPage() {
  return (
    <MarqueeManager
      kicker="Home"
      title="Partners"
      description="Curate the partner logos shown in the 'Those who work for good will' marquee on the home page. Logos are stored on Cloudinary."
      collection="partners"
      itemTitle="Partner"
      example="Marquee order"
      emptyLabel="No partners yet. Upload images for the home page marquee above."
    />
  );
}
