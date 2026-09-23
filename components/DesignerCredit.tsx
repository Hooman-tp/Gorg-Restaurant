import InstagramIcon from "./InstagramIcon";
import { DESIGNER_INSTAGRAM_ID, DESIGNER_INSTAGRAM_URL, DESIGNER_NAME } from "@/lib/contact";

export default function DesignerCredit({ className = "" }: { className?: string }) {
  return (
    <p className={`inline-flex items-center gap-1.5 text-[11px] text-[var(--color-ash)] ${className}`}>
      <span>طراح سایت: {DESIGNER_NAME}</span>
      <a
        href={DESIGNER_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`اینستاگرام طراح سایت، ${DESIGNER_INSTAGRAM_ID}`}
        className="inline-flex items-center gap-1 hover:text-[var(--color-ember-light)] transition-colors"
      >
        <InstagramIcon size={13} />
        <span dir="ltr">{DESIGNER_INSTAGRAM_ID}</span>
      </a>
    </p>
  );
}
