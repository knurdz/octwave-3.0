import {
  eventPartners,
  organization,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "en-LK",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: organization.name,
        alternateName: ["IEEE IAS UOM", "IEEE IAS Student Branch Chapter UOM"],
        url: organization.url,
        sameAs: organization.sameAs,
      },
      {
        "@type": "EducationalEvent",
        "@id": `${siteUrl}/#event`,
        name: siteName,
        alternateName: ["OctWave", "Octave 3.0"],
        description: siteDescription,
        eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "University of Moratuwa",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Moratuwa",
            addressCountry: "LK",
          },
        },
        organizer: { "@id": `${siteUrl}/#organization` },
        sponsor: eventPartners.map((partner) => ({
          "@type": "Organization",
          name: partner.name,
          url: partner.url,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
