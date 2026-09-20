import { ADDRESS, INSTAGRAM_URL, PHONE_DISPLAY } from "@/lib/contact";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "گرگ | GORG",
    servesCuisine: ["Burger", "Sandwich", "Fried Chicken", "Fast Food"],
    priceRange: "$$",
    telephone: PHONE_DISPLAY,
    sameAs: [INSTAGRAM_URL],
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS,
      addressLocality: "تهران",
      addressCountry: "IR",
    },
    openingHours: "Mo-Su 12:00-24:00",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
