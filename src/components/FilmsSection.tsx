import React from "react";
import { motion } from "framer-motion";
import { films } from "../data/films";
import FilmCard from "./FilmCard";
import Squares from "./Squares";

const FilmsSection: React.FC = () => {
    return (
        <section
            id="films"
            style={{
                position: "relative",
                background: "var(--bg-deep)",
                minHeight: "100vh",
                width: "100%",
                padding: "6rem 0 7rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {/* Top fade */}
            <div aria-hidden="true" style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "180px", zIndex: 1, pointerEvents: "none",
                background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
            }} />

            {/* Bottom fade */}
            <div aria-hidden="true" style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "180px", zIndex: 1, pointerEvents: "none",
                background: "linear-gradient(to top, #050505 0%, transparent 100%)",
            }} />

            {/* Squares — full section coverage */}
            <div
                aria-hidden="true"
                style={{ position: "absolute", inset: 0, zIndex: 0 }}
            >
                <Squares squareSize={40} borderColor="rgba(255,255,255,0.22)" direction="diagonal" speed={0.4} hoverFillColor="#1a1a1a" />
            </div>

            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "0 3rem",
                }}
            >
                {/* Section header */}
                <div style={{ marginBottom: "3.5rem" }}>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.25em",
                            color: "#06b6d4",
                            textTransform: "uppercase",
                            marginBottom: "0.75rem",
                        }}
                    >
                        Official Selections
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            fontWeight: 700,
                            color: "#f0f0f0",
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Films &amp; Screenings
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            transformOrigin: "left",
                            marginTop: "1rem",
                            width: "60px",
                            height: "2px",
                            background: "linear-gradient(to right, #06b6d4, transparent)",
                        }}
                    />
                </div>

                {/* Film cards grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {films.map((film, i) => (
                        <motion.div
                            key={film.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <FilmCard film={film} />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{
                        marginTop: "2.5rem",
                        textAlign: "center",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.8rem",
                        color: "#555",
                    }}
                >
                    More screenings will be announced soon. Stay tuned.
                </motion.p>
            </div>
        </section>
    );
};

export default FilmsSection;
