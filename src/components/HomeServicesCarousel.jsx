import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { servicesData } from "../data/agencyData";
import { ServiceCard } from "./ServiceCard";

// Number of repeated sets to allow smooth, uninterrupted infinite looping
const SETS_COUNT = 5;
const MIDDLE_SET_INDEX = 2; // sets: 0, 1, [2], 3, 4
const N = servicesData.length; // 9 cards
const INITIAL_VIRTUAL_INDEX = MIDDLE_SET_INDEX * N; // 18 (first card of middle set)

export const HomeServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_VIRTUAL_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Responsive measurements (container width, card width, gap)
  const [metrics, setMetrics] = useState({
    containerWidth: 1200,
    cardWidth: 380,
    gap: 24,
  });

  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const firstCardRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // High-performance touch and drag gesture refs (avoiding React state re-renders during active swipe)
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const dragDeltaXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isDirectionLockedRef = useRef(false);
  const isHorizontalSwipeRef = useRef(false);
  const animationTimeoutRef = useRef(null);
  const rafIdRef = useRef(null);

  // Build the repeated items array
  const repeatedItems = useMemo(() => {
    const list = [];
    for (let s = 0; s < SETS_COUNT; s++) {
      servicesData.forEach((service, idx) => {
        list.push({
          ...service,
          setIndex: s,
          itemIndex: s * N + idx,
          uniqueKey: `set-${s}-item-${service.id}`,
        });
      });
    }
    return list;
  }, []);

  // Update layout metrics dynamically
  const updateMetrics = useCallback(() => {
    if (!containerRef.current) return;
    const cWidth = containerRef.current.clientWidth;

    // Determine responsive card width & gap
    let cCardWidth = 380;
    let cGap = 24;

    if (cWidth < 640) {
      // Mobile: comfortable width with clear peek of adjacent cards
      cCardWidth = Math.min(320, Math.floor(cWidth * 0.82));
      cGap = 16;
    } else if (cWidth < 1024) {
      // Tablet: slightly larger, balanced spacing
      cCardWidth = Math.min(370, Math.floor(cWidth * 0.52));
      cGap = 20;
    } else {
      // Desktop: refined luxury dimensions
      cCardWidth = 390;
      cGap = 24;
    }

    setMetrics({
      containerWidth: cWidth,
      cardWidth: cCardWidth,
      gap: cGap,
    });
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener("resize", updateMetrics, { passive: true });
    return () => window.removeEventListener("resize", updateMetrics);
  }, [updateMetrics]);

  // Real 0..8 index of the active card
  const activeRealIndex = ((currentIndex % N) + N) % N;
  const currentService = servicesData[activeRealIndex] || servicesData[0];

  // Helper to calculate target translation for an index
  const getTargetTranslateX = useCallback(
    (index) => {
      const itemStride = metrics.cardWidth + metrics.gap;
      const containerCenter = metrics.containerWidth / 2;
      return containerCenter - (index * itemStride + metrics.cardWidth / 2);
    },
    [metrics]
  );

  // Navigate to an index with smooth transition
  const goToIndex = useCallback(
    (targetIndex) => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      setIsTransitioning(true);
      setCurrentIndex(targetIndex);

      // Apply transition styling directly to track
      if (trackRef.current) {
        const targetX = getTargetTranslateX(targetIndex);
        trackRef.current.style.transition = "transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1)";
        trackRef.current.style.transform = `translate3d(${targetX}px, 0, 0)`;
      }
    },
    [getTargetTranslateX]
  );

  // Silent normalization once animation finishes
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    // If index drifted out of the middle buffer, silently wrap back to equivalent card in middle set
    setCurrentIndex((curr) => {
      const real = ((curr % N) + N) % N;
      if (curr < N || curr >= N * 3) {
        const normalizedIndex = MIDDLE_SET_INDEX * N + real;
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          trackRef.current.style.transform = `translate3d(${getTargetTranslateX(normalizedIndex)}px, 0, 0)`;
        }
        return normalizedIndex;
      }
      return curr;
    });
  }, [getTargetTranslateX]);

  // Keep track in correct position on initial load and resize
  useEffect(() => {
    if (!isDraggingRef.current && trackRef.current) {
      const targetX = getTargetTranslateX(currentIndex);
      trackRef.current.style.transition = isTransitioning
        ? "transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1)"
        : "none";
      trackRef.current.style.transform = `translate3d(${targetX}px, 0, 0)`;
    }
  }, [metrics, currentIndex, getTargetTranslateX, isTransitioning]);

  // Backup timer in case transitionend event does not fire (e.g., hidden tab)
  useEffect(() => {
    if (isTransitioning) {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = setTimeout(() => {
        handleTransitionEnd();
      }, 480);
    }
    return () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    };
  }, [isTransitioning, handleTransitionEnd]);

  // Arrow controls (infinite loop: never disabled!)
  const handlePrev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [goToIndex, currentIndex]);

  const handleNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [goToIndex, currentIndex]);

  // Dropdown card selection: navigate via shortest circular distance
  const handleSelectService = useCallback(
    (targetRealIdx) => {
      let diff = targetRealIdx - activeRealIndex;
      if (diff > Math.floor(N / 2)) diff -= N;
      if (diff < -Math.floor((N - 1) / 2)) diff += N;
      goToIndex(currentIndex + diff);
      setDropdownOpen(false);
    },
    [activeRealIndex, currentIndex, goToIndex]
  );

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, { passive: true });
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  // Window-level keydown listener: Left & Right arrow keys for seamless accessibility
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.defaultPrevented) return;
      const root = rootRef.current;
      if (!root) return;

      const hasFocus = root.contains(document.activeElement);
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
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handlePrev, handleNext, isHovered]);

  // ============================================================
  // HIGH-PERFORMANCE TOUCH & DRAG EVENT HANDLERS
  // ============================================================

  const handleDragStart = (clientX, clientY) => {
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    hasDraggedRef.current = false;
    isDirectionLockedRef.current = false;
    isHorizontalSwipeRef.current = false;
    startXRef.current = clientX;
    startYRef.current = clientY;
    lastXRef.current = clientX;
    startTimeRef.current = Date.now();
    lastTimeRef.current = Date.now();
    dragDeltaXRef.current = 0;
  };

  const handleDragMove = (clientX, clientY, e) => {
    if (!isPointerDownRef.current) return;

    const deltaX = clientX - startXRef.current;
    const deltaY = clientY - startYRef.current;

    // Detect gesture intention in first 6px
    if (!isDirectionLockedRef.current) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isDirectionLockedRef.current = true;
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          // Horizontal intent: lock to carousel swipe
          isHorizontalSwipeRef.current = true;
          isDraggingRef.current = true;
          setIsTransitioning(false);
          if (trackRef.current) {
            trackRef.current.style.transition = "none";
          }
        } else {
          // Vertical intent: release to normal page scrolling
          isHorizontalSwipeRef.current = false;
          isPointerDownRef.current = false;
          return;
        }
      }
    }

    if (isHorizontalSwipeRef.current) {
      if (e && e.cancelable) {
        e.preventDefault();
      }

      hasDraggedRef.current = true;
      dragDeltaXRef.current = deltaX;
      lastXRef.current = clientX;
      lastTimeRef.current = Date.now();

      // Direct GPU transform update via RAF without triggering React re-renders
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        if (trackRef.current) {
          const baseX = getTargetTranslateX(currentIndex);
          const currentX = baseX + deltaX;
          trackRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;
        }
      });
    }
  };

  const handleDragEnd = () => {
    if (!isPointerDownRef.current && !isDraggingRef.current) return;

    isPointerDownRef.current = false;
    const wasDragging = isDraggingRef.current;
    isDraggingRef.current = false;
    isDirectionLockedRef.current = false;
    isHorizontalSwipeRef.current = false;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    if (wasDraggedOrFlicked(wasDragging)) {
      // Completed gesture handled in wasDraggedOrFlicked
    } else {
      goToIndex(currentIndex);
    }
  };

  const wasDraggedOrFlicked = (wasDragging) => {
    if (!wasDragging) return false;

    const deltaX = dragDeltaXRef.current;
    const now = Date.now();
    const elapsed = Math.max(1, now - startTimeRef.current);
    const velocity = deltaX / elapsed; // px/ms

    // Natural flick or distance threshold
    const flickThreshold = 0.22; // px/ms
    const distanceThreshold = Math.min(75, metrics.cardWidth * 0.18);

    if (velocity < -flickThreshold || deltaX < -distanceThreshold) {
      // Swiped left -> advance to next card
      goToIndex(currentIndex + 1);
      return true;
    } else if (velocity > flickThreshold || deltaX > distanceThreshold) {
      // Swiped right -> go to previous card
      goToIndex(currentIndex - 1);
      return true;
    }

    return false;
  };

  // Pointer event listeners (desktop mouse + modern touch)
  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      // Safe fallback if pointer capture is not supported
    }
    handleDragStart(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    handleDragMove(e.clientX, e.clientY, e);
  };

  const onPointerUp = (e) => {
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // Safe fallback
    }
    handleDragEnd();
  };

  // Dedicated touch listeners for guaranteed touch-swipe on iOS/Android
  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
    }
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  // Intercept click when user was dragging/swiping so link doesn't open
  const handleClickCapture = (e) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  // Click on a card: if unfocused, focus it; if focused, allow normal link click
  const handleCardClick = (itemIdx, e) => {
    if (itemIdx !== currentIndex) {
      e.preventDefault();
      goToIndex(itemIdx);
    }
  };

  return (
    <div
      ref={rootRef}
      className="w-full relative select-none outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080908] rounded-2xl transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        }
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Services carousel. Use left and right arrow keys to navigate."
    >
      {/* 
        Horizontal Carousel Window:
        - overflow-hidden clips side edges neatly
        - touch-pan-y allows normal vertical page scroll while capturing horizontal swipe
      */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        onClickCapture={handleClickCapture}
      >
        {/* Soft edge fade for luxury depth */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#080A08] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#080A08] to-transparent z-20 pointer-events-none" />

        {/* 
          Continuous Track:
          - Pure GPU translate3d for 60fps/120fps motion
          - Infinite loop ensures left and right sides are always filled
        */}
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translate3d(${getTargetTranslateX(currentIndex)}px, 0, 0)`,
            transition: isTransitioning
              ? "transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "none",
            gap: `${metrics.gap}px`,
            willChange: "transform",
          }}
          className="flex items-stretch"
        >
          {repeatedItems.map((service, itemIdx) => {
            const isFocused = itemIdx === currentIndex;
            const isFirst = itemIdx === 0;

            return (
              <div
                key={service.uniqueKey}
                ref={isFirst ? firstCardRef : null}
                style={{ width: `${metrics.cardWidth}px` }}
                onClick={(e) => handleCardClick(itemIdx, e)}
                className={`
                  shrink-0 rounded-2xl transition-opacity duration-300 transform-gpu
                  ${
                    isFocused
                      ? "opacity-100 ring-1 ring-[#A3FF12]/70 shadow-[0_0_30px_rgba(163,255,18,0.12)] z-10"
                      : "opacity-50 hover:opacity-80 cursor-pointer"
                  }
                `}
              >
                <div className="h-full pointer-events-auto">
                  <ServiceCard service={service} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 
        Compact Navigation Control Bar Below the Card Row
        - Left Arrow (infinite loop)
        - Compact Dropdown Card Selector (shortest circular path)
        - Right Arrow (infinite loop)
        - Card Counter Badge
      */}
      <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 relative z-30 px-4">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous service"
          title="Previous service (Left arrow key)"
          aria-keyshortcuts="ArrowLeft"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#121612] border border-white/[0.12] hover:border-[#A3FF12]/60 text-white hover:text-[#A3FF12] flex items-center justify-center transition-all duration-200 shadow-sm shrink-0 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Compact Dropdown Card Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            aria-label="Select service card"
            className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-xl bg-[#121612] border border-white/[0.14] hover:border-[#A3FF12]/60 text-left flex items-center gap-2.5 sm:gap-3 transition-all duration-200 cursor-pointer w-[240px] sm:w-[320px] max-w-[70vw] justify-between shadow-sm active:scale-[0.99] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]"
          >
            <span className="flex items-center gap-2 truncate">
              <span className="font-mono text-xs font-bold text-[#A3FF12] bg-[#161d16] px-1.5 py-0.5 rounded border border-[#A3FF12]/30 shrink-0">
                {currentService.number}
              </span>
              <span className="text-white/30 text-xs font-mono shrink-0">—</span>
              <span className="text-xs sm:text-sm font-semibold text-white truncate">
                {currentService.title}
              </span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#A7ADA5] shrink-0 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180 text-[#A3FF12]" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu Popup */}
          {dropdownOpen && (
            <div
              role="listbox"
              aria-label="Service cards list"
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[280px] sm:w-[340px] max-w-[90vw] max-h-64 overflow-y-auto rounded-xl bg-[#0d100d]/95 backdrop-blur-xl border border-white/[0.18] shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(163,255,18,0.12)] p-1.5 z-50 no-scrollbar divide-y divide-white/[0.04]"
            >
              {servicesData.map((svc, idx) => {
                const isSelected = activeRealIndex === idx;
                return (
                  <button
                    key={svc.id}
                    role="option"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => handleSelectService(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-[#162016] text-[#A3FF12] font-semibold border border-[#A3FF12]/30 shadow-sm"
                        : "text-[#DDE2D8] hover:bg-[#141814] hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isSelected ? "text-[#A3FF12]" : "text-[#A7ADA5]"
                        }`}
                      >
                        {svc.number}
                      </span>
                      <span className="text-white/20 font-mono text-xs">—</span>
                      <span className="truncate">{svc.title}</span>
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] shrink-0 shadow-[0_0_6px_#A3FF12]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next service"
          title="Next service (Right arrow key)"
          aria-keyshortcuts="ArrowRight"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#121612] border border-white/[0.12] hover:border-[#A3FF12]/60 text-white hover:text-[#A3FF12] flex items-center justify-center transition-all duration-200 shadow-sm shrink-0 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Card Counter Badge & Keyboard hint */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#A7ADA5] bg-[#121612] px-2.5 py-1.5 rounded-xl border border-white/[0.08]">
            <span className="text-[#A3FF12] font-bold">{currentService.number}</span>
            <span className="mx-1 text-white/30">/</span>
            <span>0{servicesData.length}</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#A7ADA5]/70 bg-[#121612] px-2 py-1 rounded-xl border border-white/[0.06]">
            <kbd className="px-1 py-0.2 bg-white/10 rounded text-[9px] text-[#A3FF12] font-semibold">←</kbd>
            <kbd className="px-1 py-0.2 bg-white/10 rounded text-[9px] text-[#A3FF12] font-semibold">→</kbd>
            <span className="text-[9px]">keys</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeServicesCarousel;
