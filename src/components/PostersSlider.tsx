import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import poster1 from "../assets/poster1.jpeg";
import poster2 from "../assets/poster2.jpeg";

type Poster = {
  src: string;
  alt: string;
};

const PostersSlider: React.FC = () => {
  const posters = useMemo<Poster[]>(
    () => [
      {
        src: poster1,
        alt: "KUFF 2026 registration poster — register now",
      },
      {
        src: poster2,
        alt: "KUFF 2026 delegate registration poster — open now",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % posters.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [posters.length]);

  const goPrev = () => setActiveIndex((i) => (i - 1 + posters.length) % posters.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % posters.length);

  const activePoster = posters[activeIndex];

  return (
    <div
      aria-roledescription="carousel"
      aria-label="KUFF posters"
      style={{ width: "100%" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "3 / 4",
            maxHeight: "560px",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activePoster.src}
              src={activePoster.src}
              alt={activePoster.alt}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous poster"
          style={{
            position: "absolute",
            top: "50%",
            left: "0.6rem",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next poster"
          style={{
            position: "absolute",
            top: "50%",
            right: "0.6rem",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        role="tablist"
        aria-label="Poster navigation"
        style={{
          marginTop: "0.75rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {posters.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show poster ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              style={{
                width: isActive ? "18px" : "8px",
                height: "8px",
                borderRadius: "999px",
                border: "none",
                background: isActive ? "#f72585" : "rgba(255,255,255,0.25)",
                cursor: "pointer",
                transition: "width 160ms ease, background 160ms ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostersSlider;
