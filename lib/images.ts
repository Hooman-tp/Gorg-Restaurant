/**
 * منابع تصویر غذا/فضا. همه از Unsplash و تحت Unsplash License
 * (استفاده‌ی تجاری و غیرتجاری بدون نیاز به اجازه یا کردیت).
 * هر آیتم منو یک عکس مجزا دارد؛ هیچ عکسی بین آیتم‌ها تکراری نیست.
 */
function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;
}

export const dishImages = {
  // ── گریل و کباب ──
  grillSteakFlame: unsplash("photo-1614119068601-483274e9dcb7"),
  grillKababTray: unsplash("photo-1601356616077-695728ae17cb"),
  grillSteakWine: unsplash("photo-1683315446874-e6a629087ef8"),
  grillMeatTray: unsplash("photo-1546964124-0cce460f38ef"),
  grillPlateDark: unsplash("photo-1594041680534-e8c8cdebd659"),
  grillCharcoal: unsplash("photo-1616252980327-ec70572e5df9"),

  // ── فست‌فود ──
  burgerGorg: unsplash("photo-1572802419224-296b0aeee0d9"),
  pizzaPepperoni: unsplash("photo-1534308983496-4fabb1a015ee"),
  sandwichLettuce: unsplash("photo-1610970878459-a0e464d7592b"),
  burgerFries: unsplash("photo-1594212699903-ec8a3eca50f5"),
  friesColaCup: unsplash("photo-1624855600799-ac8e8bddd1da"),
  hotdogCheese: unsplash("photo-1612392166886-ee8475b03af2"),

  // ── ایرانی ──
  persianSaffronRice: unsplash("photo-1626238328324-d55282264212"),
  persianStewSilver: unsplash("photo-1672477179695-7276b0602fa9"),
  persianRiceOlives: unsplash("photo-1684556560149-c6ac1c9cecd9"),
  persianPlateCloseup: unsplash("photo-1688234215821-268bccff69e0"),
  persianPlateTable: unsplash("photo-1688234098785-13f2d7ee2ed9"),
  persianCookedFood: unsplash("photo-1546240916-8e4ea875dd2f"),
  persianGrillTable: unsplash("photo-1555939594-58d7cb561ad1"),

  // ── ایتالیایی و فیوژن ──
  pastaCreamy: unsplash("photo-1555949258-eb67b1ef0ceb"),
  pastaPeas: unsplash("photo-1581073746562-e7fd2422f0eb"),
  risottoPlate: unsplash("photo-1476124369491-e7addf5db371"),
  lasagnaSauce: unsplash("photo-1709429790175-b02bb1b19207"),
  caesarSalad: unsplash("photo-1556386734-4227a180d19e"),
  soupBowls: unsplash("photo-1692776407523-8f3c4678ad36"),

  // ── نوشیدنی‌ها ──
  sodaGlasses: unsplash("photo-1609951651467-713256d1a3be"),
  plainDrinkGlass: unsplash("photo-1586734565008-fbdbc166fd6c"),
  mocktailRosemary: unsplash("photo-1609951651556-5334e2706168"),
  freshJuiceCups: unsplash("photo-1551024709-8f23befc6f87"),
  teaGlass: unsplash("photo-1556679343-c7306c1976bc"),

  // ── فضا (گالری/درباره) ──
  interior1: unsplash("photo-1703793578040-07e1778b6b2c"),
  interior2: unsplash("photo-1687723547516-308ac9cefba9"),
};

export const brand = {
  mark: "/images/gorg-mark.png",
  markSquare: "/images/gorg-mark-square.png",
  texture: "/images/texture-red-clean.jpg",
  posterFull: "/images/gorg-poster-full.jpg",
  location: "/images/gorg-location.jpg",
};
