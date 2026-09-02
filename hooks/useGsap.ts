import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

export function useGsap(callback: () => void, deps: React.DependencyList = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(callback);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
