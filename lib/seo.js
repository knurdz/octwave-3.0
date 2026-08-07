export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://octwave.knurdz.org");

export const siteName = "OctWave 3.0";

export const siteDescription =
  "OctWave 3.0 is Sri Lanka's premier undergraduate AI and Machine Learning competition by IEEE IAS Student Branch Chapter, University of Moratuwa. Workshops, Kaggle preliminary, and a live final.";

export const siteKeywords = [
  "OctWave",
  "OctWave 3.0",
  "Octave",
  "Octave 3.0",
  "IEEE",
  "IEEE IAS",
  "IEEE IAS Student Branch Chapter",
  "University of Moratuwa",
  "UOM",
  "CWIT",
  "Colombo West International Terminal",
  "HackSL",
  "AI competition Sri Lanka",
  "Machine Learning competition",
  "undergraduate AI hackathon",
  "Kaggle competition Sri Lanka",
  "IEEE IAS UOM",
];

export const organization = {
  name: "IEEE IAS Student Branch Chapter, University of Moratuwa",
  shortName: "IEEE IAS UOM",
  url: "https://www.linkedin.com/company/ieeeiasuom",
  sameAs: [
    "https://www.facebook.com/share/1986hbaq9z",
    "https://www.linkedin.com/company/ieeeiasuom",
  ],
};

export const webPartner = {
  name: "Knurdz Community",
  url: "https://knurdz.org",
};

export const eventPartners = [
  {
    name: "Colombo West International Terminal (Private) Limited",
    role: "Gold Partner",
    url: "https://www.cwit.lk/",
  },
  {
    name: "HackSL",
    role: "Digital Media Partner",
    url: "https://www.linkedin.com/company/hacksl/?originalSubdomain=lk",
  },
];

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "OctWave 3.0 · IEEE IAS Student Branch Chapter · University of Moratuwa",
};
