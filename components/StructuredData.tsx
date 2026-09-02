export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "گرگ | GORG",
    servesCuisine: ["Grill", "Fast Food", "Persian", "Italian"],
    priceRange: "$$",
    telephone: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "021-22240039",
    address: {
      "@type": "PostalAddress",
      streetAddress: "بلوار اندرزگو، اشکستان‌پور جنوبی، پلاک ۳",
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
