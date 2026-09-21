import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface MobileCardSliderProps {
  children: React.ReactNode;
  /** Desktop grid layout classes, e.g. "md:grid-cols-2 lg:grid-cols-3" */
  desktopGridClassName?: string;
  /** Mobile card width class. Defaults to 86vw on mobile for 1.15-1.25 peek */
  cardWidthClassName?: string;
  /** Gap between cards */
  gapClassName?: string;
  /** Whether to show subtle mobile left/right arrows and swipe hint */
  showControls?: boolean;
  /** Optional custom label for the swipe hint (e.g. "Swipe services") */
  swipeHintLabel?: string;
  /** Extra class name for the wrapper */
  className?: string;
  /** Optional container ID */
  id?: string;
}

export const MobileCardSlider: React.FC<MobileCardSliderProps> = ({
  children,
  desktopGridClassName = "md:grid-cols-2 lg:grid-cols-3",
  cardWidthClassName = "w-[86vw] max-w-[340px] sm:max-w-none sm:w-[360px]",
  gapClassName = "gap-3.5 sm:gap-6",
  showControls = true,
  swipeHintLabel = "Swipe to explore",
  className = "",
  id,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const childArray = React.Children.toArray(children).filter(Boolean);
  const totalItems = childArray.length;

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Calculate current visible item index
    if (totalItems > 0 && clientWidth > 0) {
      const items = Array.from(el.children) as HTMLElement[];
      if (items.length > 0) {
        const containerCenter = scrollLeft + clientWidth / 2;
        let closestIdx = 0;
        let minDiff = Infinity;

        items.forEach((item, idx) => {
          const itemCenter = item.offsetLeft + item.offsetWidth / 2;
          const diff = Math.abs(containerCenter - itemCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        setCurrentIndex(closestIdx);
      }
    }
  }, [totalItems]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToItem = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (items[index]) {
      items[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    const targetIdx = direction === "left" 
      ? Math.max(0, currentIndex - 1) 
      : Math.min(totalItems - 1, currentIndex + 1);
    scrollToItem(targetIdx);
  };

  return (
    <div className={`relative ${className}`} id={id}>
      {/* Subtle Mobile Swipe & Compact Arrow Header (Hidden on Desktop md+) */}
      {showControls && totalItems > 1 && (
        <div className="flex md:hidden items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#A7ADA5] uppercase tracking-wider bg-[#101310] px-2.5 py-1 rounded border border-white/[0.08]">
              <span className="text-[#A3FF12] text-xs">‹</span>
              <span>{swipeHintLabel}</span>
              <span className="text-[#A3FF12] text-xs">›</span>
            </span>
            <span className="text-[10px] font-mono text-[#A3FF12] font-semibold bg-[#141814] px-2 py-0.5 rounded border border-[#A3FF12]/20">
              {currentIndex + 1} / {totalItems}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-7 h-7 rounded-lg bg-[#101310] border border-white/[0.1] text-white flex items-center justify-center hover:border-[#A3FF12]/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#DDE2D8]" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-7 h-7 rounded-lg bg-[#101310] border border-white/[0.1] text-white flex items-center justify-center hover:border-[#A3FF12]/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#DDE2D8]" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container: Flex scroll-snap on mobile (<md), Standard CSS Grid on desktop (md+) */}
      <div
        ref={scrollContainerRef}
        className={`
          flex md:grid
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory md:snap-none
          no-scrollbar
          -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0
          pb-4 md:pb-0
          items-stretch
          ${gapClassName}
          ${desktopGridClassName}
        `}
      >
        {childArray.map((child, idx) => (
          <div
            key={idx}
            className={`
              flex-shrink-0 snap-center flex flex-col
              ${cardWidthClassName}
              md:w-auto md:max-w-none md:flex-shrink md:snap-align-none
            `}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCardSlider;
