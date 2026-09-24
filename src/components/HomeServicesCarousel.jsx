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
  const [isDragging, setIsDragging] = useState(false);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Responsive measurements (container width, card width, gap)
  const [metrics, setMetrics] = useState({
    containerWidth: 1200,
    cardWidth: 380,
    gap: 24,
  });

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const firstCardRef = useRef(null);
  const dropdownRef = useRef(null);

  // Drag tracking refs
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const animationTimeoutRef = useRef(null);

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
      cCardWidth = Math.min(320, Math.floor(cWidth * 0.82));
      cGap = 16;
    } else if (cWidth < 1024) {
      cCardWidth = 340;
      cGap = 20;
    } else {
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

  // Navigate to an index with smooth transition
  const goToIndex = useCallback((targetIndex) => {
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    setIsTransitioning(true);
    setCurrentIndex(targetIndex);
  }, []);

  // Silent normalization once animation finishes
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    // If index drifted out of the middle buffer, silently wrap back to equivalent card in middle set
    setCurrentIndex((curr) => {
      const real = ((curr % N) + N) % N;
      if (curr < N || curr >= N * 3) {
        return MIDDLE_SET_INDEX * N + real;
      }
      return curr;
    });
  }, []);

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
      // shortest distance in mod 9
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

  // Pointer drag events for smooth swipe & drag
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    setIsTransitioning(false);
    setIsDragging(true);
    setDragDeltaX(0);
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - startYRef.current;

    // Detect horizontal intention
    if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        hasDraggedRef.current = true;
        setDragDeltaX(deltaX);
      }
    }
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    const threshold = Math.min(65, metrics.cardWidth * 0.16);
    if (dragDeltaX < -threshold) {
      goToIndex(currentIndex + 1);
    } else if (dragDeltaX > threshold) {
      goToIndex(currentIndex - 1);
    } else {
      goToIndex(currentIndex);
    }
    setDragDeltaX(0);
  };

  // Intercept click when user was dragging so link doesn't open
  const handleClickCapture = (e) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDraggedRef.current = false;
    }
  };

  // Click on a card: if unfocused, focus it; if focused, allow normal link click
  const handleCardClick = (itemIdx, e) => {
    if (itemIdx !== currentIndex) {
      e.preventDefault();
      goToIndex(itemIdx);
    }
  };

  // Compute transform translateX to place currentIndex precisely at container center
  const itemStride = metrics.cardWidth + metrics.gap;
  const containerCenter = metrics.containerWidth / 2;
  const targetTranslateX = containerCenter - (currentIndex * itemStride + metrics.cardWidth / 2);
  const currentTranslateX = targetTranslateX + dragDeltaX;

  return (
    <div
      className="w-full relative select-none"
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
      aria-label="Services carousel"
    >
      {/* 
        Horizontal Carousel Window:
        - overflow-hidden clips side edges neatly
        - touch-pan-y allows normal vertical page scroll while capturing horizontal swipe
      */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
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
            transform: `translate3d(${currentTranslateX}px, 0, 0)`,
            transition: isTransitioning
              ? "transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "none",
            gap: `${metrics.gap}px`,
            willChange: "transform",
          }}
          className={`flex items-stretch ${isDragging ? "pointer-events-none" : ""}`}
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
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#121612] border border-white/[0.12] hover:border-[#A3FF12]/60 text-white hover:text-[#A3FF12] flex items-center justify-center transition-all duration-200 shadow-sm shrink-0 cursor-pointer active:scale-95"
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
            className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-xl bg-[#121612] border border-white/[0.14] hover:border-[#A3FF12]/60 text-left flex items-center gap-2.5 sm:gap-3 transition-all duration-200 cursor-pointer w-[240px] sm:w-[320px] max-w-[70vw] justify-between shadow-sm active:scale-[0.99]"
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
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#121612] border border-white/[0.12] hover:border-[#A3FF12]/60 text-white hover:text-[#A3FF12] flex items-center justify-center transition-all duration-200 shadow-sm shrink-0 cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Card Counter Badge */}
        <div className="flex items-center">
          <span className="text-[11px] font-mono text-[#A7ADA5] bg-[#121612] px-2.5 py-1.5 rounded-xl border border-white/[0.08]">
            <span className="text-[#A3FF12] font-bold">{currentService.number}</span>
            <span className="mx-1 text-white/30">/</span>
            <span>0{servicesData.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeServicesCarousel;
