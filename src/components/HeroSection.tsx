import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aurora from "./ui/Aurora";
import CurvedLoop from "./ui/CurvedLoop";

// ── Target: March 11, 2026 00:00:00 IST (UTC+5:30) ──
const TARGET_DATE = new Date("2026-03-11T00:00:00+05:30").getTime();

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function getTimeLeft(): TimeLeft {
    const diff = Math.max(0, TARGET_DATE - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
}

// ── Animated digit block ──
interface DigitProps {
    value: number;
    label: string;
}

const DigitBlock: React.FC<DigitProps> = ({ value, label }) => {
    const formattedValue = String(value).padStart(2, "0");

    return (
        <div style={{ textAlign: "center" }}>
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    width: "5rem",
                    height: "5.5rem",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={formattedValue}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "2.25rem",
                            fontWeight: 700,
                            color: "#f0f0f0",
                            lineHeight: 1,
                        }}
                    >
                        {formattedValue}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span
                style={{
                    display: "block",
                    marginTop: "0.4rem",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: "#888",
                    textTransform: "uppercase",
                }}
            >
                {label}
            </span>
        </div>
    );
};

// ── Separator ──
const Sep: React.FC = () => (
    <span
        style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "2rem",
            fontWeight: 300,
            color: "rgba(251,191,36,0.5)",
            marginBottom: "1.4rem",
            lineHeight: "5.5rem",
        }}
    >
        :
    </span>
);

// ── Hero Section ──
const HeroSection: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleRegister = () => {
        window.open("mailto:kuff@kannuruniversity.ac.in?subject=KUFF 2026 Registration", "_blank");
    };

    return (
        <section
            id="hero"
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                background: "var(--bg-deep)",
            }}
        >
            {/* Aurora WebGL background */}
            <Aurora
                colorStops={["#3d0066", "#003366", "#660033"]}
                amplitude={1.2}
                blend={0.6}
                speed={0.8}
            />

            {/* Top vignette — protects navbar + hero text readability */}
            <div aria-hidden="true" style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "220px",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
                zIndex: 1,
                pointerEvents: "none",
            }} />

            {/* Main content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "120px 1.5rem 3rem",
                }}
            >
                {/* Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        marginBottom: "1.5rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.35rem 1rem",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "99px",
                        background: "rgba(0,0,0,0.45)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <span
                        style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#f72585",
                            display: "inline-block",
                            animation: "glow-pulse 2s ease-in-out infinite",
                        }}
                    />
                    <span
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.18em",
                            color: "#ffffff",
                            textTransform: "uppercase",
                        }}
                    >
                        Kannur University Film Festival
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "clamp(3rem, 10vw, 8rem)",
                        fontWeight: 700,
                        lineHeight: 0.9,
                        letterSpacing: "-0.03em",
                        color: "#f0f0f0",
                        marginBottom: "1rem",
                    }}
                >
                    KUFF
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "clamp(0.9rem, 2.5vw, 1.35rem)",
                        fontWeight: 400,
                        color: "#fbbf24",
                        letterSpacing: "0.06em",
                        marginBottom: "0.6rem",
                    }}
                >
                    March 11 &amp; 12, 2026
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
                        color: "#888",
                        marginBottom: "0.5rem",
                        letterSpacing: "0.04em",
                    }}
                >
                    Mangattuparamba University Campus
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        maxWidth: "520px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
                        color: "#aaa",
                        lineHeight: 1.7,
                        marginBottom: "2.5rem",
                    }}
                >
                    A celebration of cinema, bringing together students and filmmakers from
                    across the country.
                </motion.p>

                {/* Register Now button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(247,37,133,0.55)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRegister}
                    style={{
                        padding: "0.85rem 2.5rem",
                        background: "#f72585",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        textTransform: "uppercase",
                    }}
                >
                    Register Now
                </motion.button>

                {/* Countdown Timer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.55 }}
                    style={{ marginTop: "4rem" }}
                >
                    <p
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            color: "#555",
                            textTransform: "uppercase",
                            marginBottom: "1.25rem",
                        }}
                    >
                        Festival begins in
                    </p>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.75rem",
                            justifyContent: "center",
                        }}
                    >
                        <DigitBlock value={timeLeft.days} label="Days" />
                        <Sep />
                        <DigitBlock value={timeLeft.hours} label="Hours" />
                        <Sep />
                        <DigitBlock value={timeLeft.minutes} label="Mins" />
                        <Sep />
                        <DigitBlock value={timeLeft.seconds} label="Secs" />
                    </div>
                </motion.div>
            </div>

            {/* CurvedLoop Marquee at the bottom */}
            <div style={{ position: "relative", zIndex: 2 }}>
                <CurvedLoop />
            </div>
        </section>
    );
};

export default HeroSection;
