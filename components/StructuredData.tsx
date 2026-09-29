import { ADDRESS, INSTAGRAM_URL, PHONE_DISPLAY } from "@/lib/contact";

const SITE_URL = "https://gorg-restaurant.ir";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: "گرگ | GORG",
    alternateName: ["گرگ", "GORG", "رستوران گرگ"],
    url: SITE_URL,
    image: [`${SITE_URL}/opengraph-image.jpg`],
    logo: `${SITE_URL}/images/gorg-mark-512.png`,
    description:
      "رستوران گرگ: برگر، ساندویچ بریسکت، مرغ سوخاری نشویل، بال و سیب‌زمینی. سفارش آنلاین و دلیوری در تهران.",
    servesCuisine: ["Burger", "Sandwich", "Fried Chicken", "Fast Food"],
    priceRange: "$$",
    telephone: PHONE_DISPLAY,
    menu: `${SITE_URL}/menu`,
    hasMenu: `${SITE_URL}/menu`,
    acceptsReservations: false,
    sameAs: [INSTAGRAM_URL],
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS,
      addressLocality: "تهران",
      addressCountry: "IR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "23:59",
      },
    ],
  };

  // «<» را escape می‌کنیم تا هیچ مقداری نتواند تگِ script را ببندد
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
