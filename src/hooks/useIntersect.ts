import { useCallback, useEffect, useRef, useState } from "react";

interface OptionType {
  threshold?: number;
  rootMargin?: string;
}
const useIntersect = (onIntersect: any, option: OptionType, dep = null) => {
  const target = useRef<HTMLElement>(null);
  const [isView, setIsView] = useState(false);

  const checkIntersect = useCallback(
    async ([entry]: any, observer: any) => {
      if (entry.isIntersecting && observer) {
        await onIntersect(entry, observer);
        setIsView(true);
      } else {
        setIsView(false);
      }
    },
    [dep]
  );

  useEffect(() => {
    let observer: IntersectionObserver;

    if (target.current) {
      observer = new IntersectionObserver(checkIntersect, {
        ...option,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, option?.threshold, option?.rootMargin, checkIntersect]);

  return [target, isView];
};

export default useIntersect;
