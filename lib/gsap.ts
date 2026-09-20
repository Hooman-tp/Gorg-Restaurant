import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// روی سافاریِ موبایل، مخفی/ظاهر شدن نوار آدرس حین اسکرول یک رویداد
// resize فایر می‌کند. بدون این خط، ScrollTrigger با هر resize کل
// موقعیت‌های پین را دوباره حساب می‌کند؛ یعنی درست وسط اسکرول (بیشتر
// از همه داخل بخش پین‌شده‌ی FireStory) یک لرزش/پرش کوچک ایجاد می‌شود.
// این پرچم دقیقاً برای همین مورد در GSAP وجود دارد.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
