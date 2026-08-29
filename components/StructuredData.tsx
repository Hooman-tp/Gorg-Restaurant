export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "گرگ | GORG",
    servesCuisine: ["Grill", "Fast Food", "Persian", "Italian"],
    priceRange: "$$",
    telephone: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "021-91234567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "خیابان ولیعصر، بالاتر از پارک وی",
      addressLocality: "تهران",
      addressCountry: "IR",
    },
    openingHours: "Mo-Su 12:00-24:30",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
