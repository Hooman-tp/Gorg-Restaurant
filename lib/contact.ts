/**
 * اطلاعات تماس رستوران، یک جا برای کل سایت.
 * شماره‌ی تلفن عمداً از متغیر محیطی خوانده نمی‌شود تا مقدار قدیمی روی
 * هاست نتواند شماره‌ی درست را بازنویسی کند.
 */
export const PHONE_DISPLAY = "021-22240010";
export const PHONE_TEL = `tel:${PHONE_DISPLAY.replace(/-/g, "")}`;
export const PHONE_FA = "۰۲۱-۲۲۲۴۰۰۱۰";

export const INSTAGRAM_ID = "gorgtehran";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_ID}/`;

export const ADDRESS = "بلوار اندرزگو، اشکستان‌پور جنوبی، پلاک ۳";

/** اعتبار طراح سایت، در فوتر عمومی و فوتر پنل مدیریت نمایش داده می‌شود */
export const DESIGNER_NAME = "هومن تقی‌پور";
export const DESIGNER_INSTAGRAM_ID = "hooman_tp";
export const DESIGNER_INSTAGRAM_URL = `https://www.instagram.com/${DESIGNER_INSTAGRAM_ID}/`;
