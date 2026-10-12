import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const MobileCardSlider = ({
  children,
  desktopGridClassName = "md:grid-cols-2 lg:grid-cols-3",
  cardWidthClassName = "w-[85vw] max-w-[340px] sm:w-[380px] sm:max-w-[400px] md:w-[440px] md:max-w-[460px]",
  gapClassName = "gap-4 sm:gap-6",
  showControls = true,
  swipeHintLabel = "Swipe to explore",
  className = "",
  id,
}) => {
  const wrapperRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Gesture refs for smooth touch-swipe and drag without unintended click triggers
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const startTimeRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isDirectionLockedRef = useRef(false);
  const isHorizontalSwipeRef = useRef(false);
  const lastXRef = useRef(0);

  const childArray = React.Children.toArray(children).filter(Boolean);
  const totalItems = childArray.length;

  // Determine if desktopGridClassName targets lg: vs md:
  const isLgGrid = desktopGridClassName.includes("lg:grid");

  // Calculate current visible item index and scroll boundaries
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Calculate which item is currently centered / closest to view
    if (totalItems > 0 && clientWidth > 0) {
      const items = Array.from(el.children);
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

  // Reset to first item if child count changes (e.g., category filter)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      setCurrentIndex(0);
    }
  }, [totalItems]);

  const scrollToItem = useCallback((index) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const items = Array.from(el.children);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
    if (items[clampedIndex]) {
      items[clampedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrentIndex(clampedIndex);
    }
  }, []);

  const handleScroll = useCallback(
    (direction) => {
      setCurrentIndex((curr) => {
        const targetIdx =
          direction === "left"
            ? Math.max(0, curr - 1)
            : Math.min(totalItems - 1, curr + 1);
        scrollToItem(targetIdx);
        return targetIdx;
      });
    },
    [totalItems, scrollToItem]
  );

  // ============================================================
  // ACCESSIBILITY & KEYBOARD NAVIGATION (Left & Right Arrows)
  // ============================================================

  const handleKeyDown = useCallback(
    (e) => {
      const target = e.target;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isInput) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        handleScroll("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        handleScroll("right");
      } else if (e.key === "Home") {
        e.preventDefault();
        e.stopPropagation();
        scrollToItem(0);
      } else if (e.key === "End") {
        e.preventDefault();
        e.stopPropagation();
        scrollToItem(totalItems - 1);
      }
    },
    [handleScroll, scrollToItem, totalItems]
  );

  // Window-level keydown listener when carousel is focused or hovered
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.defaultPrevented) return;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const hasFocus = wrapper.contains(document.activeElement);
      if (!hasFocus && !isHovered) return;

      const target = e.target;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isInput) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleScroll("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleScroll("right");
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleScroll, isHovered]);

  // ============================================================
  // TOUCH-SWIPE & DRAG EVENT HANDLERS
  // ============================================================

  const handleTouchStart = (e) => {
    const el = scrollContainerRef.current;
    if (!el || e.touches.length !== 1) return;

    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    hasDraggedRef.current = false;
    isDirectionLockedRef.current = false;
    isHorizontalSwipeRef.current = false;

    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    lastXRef.current = e.touches[0].clientX;
    scrollLeftStartRef.current = el.scrollLeft;
    startTimeRef.current = Date.now();
  };

  const handleTouchMove = (e) => {
    if (!isPointerDownRef.current || e.touches.length !== 1) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startXRef.current;
    const deltaY = currentY - startYRef.current;

    // Detect direction in first 6px
    if (!isDirectionLockedRef.current) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isDirectionLockedRef.current = true;
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          // Horizontal intent: lock to slider swipe
          isHorizontalSwipeRef.current = true;
          isDraggingRef.current = true;
        } else {
          // Vertical intent: release to browser scroll
          isHorizontalSwipeRef.current = false;
          isPointerDownRef.current = false;
          return;
        }
      }
    }

    if (isHorizontalSwipeRef.current) {
      if (e.cancelable) {
        e.preventDefault();
      }
      hasDraggedRef.current = true;
      lastXRef.current = currentX;
      // 1:1 direct tracking
      el.scrollLeft = scrollLeftStartRef.current - deltaX;
    }
  };

  const handleTouchEnd = () => {
    if (!isPointerDownRef.current && !isDraggingRef.current) return;

    const wasDragging = isDraggingRef.current;
    isPointerDownRef.current = false;
    isDraggingRef.current = false;
    isDirectionLockedRef.current = false;
    isHorizontalSwipeRef.current = false;

    if (wasDragging) {
      const el = scrollContainerRef.current;
      if (!el) return;

      const deltaX = lastXRef.current - startXRef.current;
      const elapsed = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = deltaX / elapsed; // px/ms

      // Quick flick detection or distance snap
      if (velocity < -0.22 || deltaX < -60) {
        // Flicked left -> next item
        handleScroll("right");
      } else if (velocity > 0.22 || deltaX > 60) {
        // Flicked right -> prev item
        handleScroll("left");
      } else {
        // Snap to nearest item
        updateScrollState();
      }
    }
  };

  // Mouse Drag Support (Desktop & Tablet with pointer/mouse)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    scrollLeftStartRef.current = el.scrollLeft;
    startTimeRef.current = Date.now();
  };

  const handleMouseMove = (e) => {
    if (!isPointerDownRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 6) {
      isDraggingRef.current = true;
      hasDraggedRef.current = true;
      lastXRef.current = e.clientX;
      el.scrollLeft = scrollLeftStartRef.current - deltaX;
    }
  };

  const handleMouseUp = () => {
    if (!isPointerDownRef.current) return;
    const wasDragging = isDraggingRef.current;
    isPointerDownRef.current = false;
    isDraggingRef.current = false;

    if (wasDragging) {
      const deltaX = lastXRef.current - startXRef.current;
      const elapsed = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = deltaX / elapsed;

      if (velocity < -0.22 || deltaX < -60) {
        handleScroll("right");
      } else if (velocity > 0.22 || deltaX > 60) {
        handleScroll("left");
      } else {
        updateScrollState();
      }
    }
  };

  // Intercept click when user was swiping or dragging so card modal does not open accidentally
  const handleClickCapture = (e) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects carousel. Use left and right arrow keys to navigate."
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080908] rounded-xl transition-shadow ${className}`}
      id={id}
    >
      {/* 
        Responsive Navigation Header Controls
        Visible on mobile and tablet (hidden on desktop grid)
      */}
      {showControls && totalItems > 1 && (
        <div
          className={`flex ${
            isLgGrid ? "lg:hidden" : "md:hidden"
          } items-center justify-between mb-3 px-1 select-none`}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#A7ADA5] uppercase tracking-wider bg-[#101310] px-3 py-1 rounded-lg border border-white/[0.08]">
              <span className="text-[#A3FF12] text-xs font-bold">‹</span>
              <span>{swipeHintLabel}</span>
              <span className="text-[#A3FF12] text-xs font-bold">›</span>
            </span>
            <span className="text-[10px] font-mono text-[#A3FF12] font-semibold bg-[#141814] px-2 py-0.5 rounded border border-[#A3FF12]/20">
              {currentIndex + 1} / {totalItems}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#A7ADA5]/70 bg-[#101310] px-2 py-0.5 rounded border border-white/[0.06]">
              <kbd className="px-1 py-0.2 bg-white/10 rounded text-[9px] text-[#A3FF12] font-semibold">←</kbd>
              <kbd className="px-1 py-0.2 bg-white/10 rounded text-[9px] text-[#A3FF12] font-semibold">→</kbd>
              <span className="text-[9px]">keys</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              title="Previous project (Left arrow key)"
              aria-keyshortcuts="ArrowLeft"
              className="w-8 h-8 rounded-lg bg-[#101310] border border-white/[0.1] text-white flex items-center justify-center hover:border-[#A3FF12]/50 hover:text-[#A3FF12] disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Next project"
              title="Next project (Right arrow key)"
              aria-keyshortcuts="ArrowRight"
              className="w-8 h-8 rounded-lg bg-[#101310] border border-white/[0.1] text-white flex items-center justify-center hover:border-[#A3FF12]/50 hover:text-[#A3FF12] disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 
        Main Container:
        - Flex scroll-snap with smooth touch-swipe on mobile & tablet
        - Desktop grid on large screens
        - No-scrollbar for sleek luxury editorial aesthetic
      */}
      <div
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClickCapture={handleClickCapture}
        className={`
          flex ${isLgGrid ? "lg:grid" : "md:grid"}
          overflow-x-auto ${isLgGrid ? "lg:overflow-visible" : "md:overflow-visible"}
          snap-x snap-mandatory ${isLgGrid ? "lg:snap-none" : "md:snap-none"}
          no-scrollbar
          -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0
          pb-4 ${isLgGrid ? "lg:pb-0" : "md:pb-0"}
          items-stretch
          touch-pan-y
          cursor-grab active:cursor-grabbing
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
              ${isLgGrid ? "lg:w-auto lg:max-w-none lg:flex-shrink lg:snap-align-none" : "md:w-auto md:max-w-none md:flex-shrink md:snap-align-none"}
            `}
          >
            {child}
          </div>
        ))}
      </div>

      {/* 
        Bottom Pagination Dots for Mobile & Tablet
        Allows direct jumping to any project
      */}
      {totalItems > 1 && (
        <div
          className={`flex ${
            isLgGrid ? "lg:hidden" : "md:hidden"
          } items-center justify-center gap-1.5 mt-3`}
        >
          {childArray.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToItem(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-6 h-1.5 bg-[#A3FF12] shadow-[0_0_8px_#A3FF12]"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileCardSlider;
