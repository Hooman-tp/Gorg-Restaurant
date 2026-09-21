/**
 * میزِ فعلیِ مشتری (وقتی QR روی میز را اسکن کرده). فقط در «همین نشستِ مرورگر» نگه داشته می‌شود
 * تا مشتری بعد از رفتن از رستوران، سفارشِ اشتباهی روی همان میز ثبت نکند.
 */
const KEY = "gorg-table";

export interface TableInfo {
  code: string;
  title: string;
}

export function readTable(): TableInfo | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const t = JSON.parse(raw) as TableInfo;
    return t && typeof t.code === "string" && t.code ? t : null;
  } catch {
    return null;
  }
}

export function saveTable(t: TableInfo) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(t));
  } catch {
    /* حالت خصوصی مرورگر */
  }
}

export function clearTable() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* نادیده */
  }
}
