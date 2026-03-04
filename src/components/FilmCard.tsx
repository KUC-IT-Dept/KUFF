import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, MapPin, Clock } from "lucide-react";
import type { Film } from "../data/films";

interface FilmCardProps {
    film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onTapStart={() => setHovered((v) => !v)}
            style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#111",
                border: "1px solid rgba(255,255,255,0.07)",
                cursor: "pointer",
                aspectRatio: "3/4",
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            {/* Poster */}
            <img
                src={film.posterUrl}
                alt={film.title}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                    transform: hovered ? "scale(1.06)" : "scale(1)",
                }}
                loading="lazy"
            />

            {/* Default gradient overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.5) 45%, transparent 70%)",
                }}
            />

            {/* Default info */}
            <AnimatePresence>
                {!hovered && (
                    <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "1rem",
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: "Space Grotesk, sans-serif",
                                fontWeight: 700,
                                fontSize: "1rem",
                                color: "#f0f0f0",
                                marginBottom: "0.4rem",
                                lineHeight: 1.2,
                            }}
                        >
                            {film.title}
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                            }}
                        >
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.35rem",
                                    fontSize: "0.72rem",
                                    color: "#fbbf24",
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                <Clock size={11} />
                                {film.schedule}
                            </span>
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.35rem",
                                    fontSize: "0.72rem",
                                    color: "#888",
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                <MapPin size={11} />
                                {film.location}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover overlay */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        key="hover"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top, rgba(5,5,5,0.99) 0%, rgba(5,5,5,0.85) 50%, rgba(5,5,5,0.4) 100%)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            padding: "1.25rem",
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: "Space Grotesk, sans-serif",
                                fontWeight: 700,
                                fontSize: "1.15rem",
                                color: "#f0f0f0",
                                marginBottom: "0.75rem",
                                lineHeight: 1.2,
                            }}
                        >
                            {film.title}
                        </h3>

                        {/* Meta row */}
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                                marginBottom: "0.75rem",
                            }}
                        >
                            <span style={metaStyle}>
                                <Clock size={10} /> {film.runtime}
                            </span>
                            <span style={metaStyle}>
                                <MapPin size={10} /> {film.location}
                            </span>
                        </div>

                        {/* Director */}
                        <p style={labelStyle}>Director</p>
                        <p style={valueStyle}>{film.director}</p>



                        {/* Synopsis */}
                        <p
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.85rem",
                                color: "#bbb",
                                lineHeight: 1.7,
                                marginBottom: "1rem",
                                display: "-webkit-box",
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {film.synopsis}
                        </p>

                        {/* Trailer Button */}
                        <a
                            href={film.trailerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                padding: "0.5rem 1rem",
                                background: "rgba(247,37,133,0.15)",
                                border: "1px solid rgba(247,37,133,0.5)",
                                borderRadius: "5px",
                                color: "#f72585",
                                fontFamily: "Space Grotesk, sans-serif",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                letterSpacing: "0.05em",
                                transition: "background 0.2s",
                                width: "fit-content",
                            }}
                            onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.background =
                                "rgba(247,37,133,0.3)")
                            }
                            onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.background =
                                "rgba(247,37,133,0.15)")
                            }
                        >
                            <Play size={12} fill="#f72585" />
                            Watch Trailer
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const metaStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.2rem 0.5rem",
    background: "rgba(255,255,255,0.07)",
    borderRadius: "3px",
    fontSize: "0.65rem",
    color: "#ccc",
    fontFamily: "Inter, sans-serif",
};

const labelStyle: React.CSSProperties = {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: "0.6rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#555",
    marginBottom: "0.1rem",
};

const valueStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.78rem",
    color: "#ccc",
};

export default FilmCard;
