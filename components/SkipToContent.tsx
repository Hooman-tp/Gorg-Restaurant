export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[200] focus:bg-[var(--color-ember)] focus:text-white focus:px-5 focus:py-3 focus:rounded-full focus:font-bold"
    >
      برو به محتوای اصلی
    </a>
  );
}
