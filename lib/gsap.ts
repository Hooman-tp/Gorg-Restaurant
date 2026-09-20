import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// روی موبایل، بالا/پایین رفتنِ نوار مرورگر نباید باعث محاسبه‌ی دوباره‌ی همه‌ی
// ScrollTriggerها (و پرش وسط اسکرول) شود.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
