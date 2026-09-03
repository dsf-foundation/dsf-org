import MarqueeManager from "@/app/admin/content-manager/components/marquee-manager";

export default function CertificatesPage() {
  return (
    <MarqueeManager
      kicker="About"
      title="Certificates &amp; Registration"
      description="Curate the certificate scan shown in the 'Certificates & registration' marquee on the About page. Certificates are stored on Cloudinary."
      collection="certificates"
      itemTitle="Certificate"
      example="Marquee order"
      emptyLabel="No certificates yet. Upload images for the About page marquee above."
    />
  );
}
