import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram,  } from "lucide-react";
import CircularText from "./ui/CircularText";

const CONTACT_LINKS = [
    { icon: Mail, label: "Unionchairman@kannuruniv.ac.in", href: "mailto:Unionchairman@kannuruniv.ac.in" },
    { icon: Phone, label: "+91  7994314469", href: "tel:+917994314469" },
    { icon: Instagram, label: "@kannur_university_union24_25", href: "https://www.instagram.com/kannur_university_union24_25" }, 
];

const AboutSection: React.FC = () => {
    return (
        <section
            id="about"
            style={{
                position: "relative",
                background: "var(--bg-dark)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                padding: "7rem 0",
                overflow: "hidden",
            }}
        >
            {/* Background accent */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "-200px",
                    right: "-200px",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: "0 1.5rem",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    alignItems: "center",
                }}
                className="about-grid"
            >
                {/* Left: Text content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                >
                    <p
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.25em",
                            color: "#fbbf24",
                            textTransform: "uppercase",
                            marginBottom: "0.75rem",
                        }}
                    >
                        About the Festival
                    </p>
                    <h2
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "clamp(1.8rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: "#f0f0f0",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Kannur University Union
                    </h2>
                    <p
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.95rem",
                            color: "#999",
                            lineHeight: 1.8,
                            marginBottom: "1.25rem",
                        }}
                    >
                        The Kannur University Union is the apex student body representing over
                        1000 students across all campuses. We believe in the transformative
                        power of art and cinema to provoke thought, spark empathy, and build
                        community.
                    </p>
                    <p
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.95rem",
                            color: "#999",
                            lineHeight: 1.8,
                            marginBottom: "2rem",
                        }}
                    >
                        KUFF — Kannur University Film Festival — is our flagship cultural
                        initiative, curated by the Student Union . The festival celebrates independent
                        cinema from student filmmakers and emerging directors across Kerala and
                        beyond.
                    </p>

                    {/* Contact links */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                        {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
                            <a
                                key={href}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    textDecoration: "none",
                                    color: "#888",
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "0.875rem",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) =>
                                    ((e.currentTarget as HTMLElement).style.color = "#f0f0f0")
                                }
                                onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLElement).style.color = "#888")
                                }
                            >
                                <span
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "6px",
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon size={14} />
                                </span>
                                {label}
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Right: CircularText badge + decorative block */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.1 }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2rem",
                    }}
                >
                    {/* Circular text badge with inner content */}
                    <div style={{ position: "relative", display: "inline-flex" }}>
                        <CircularText
                            text="SUPPORTING INDEPENDENT CINEMA •"
                            radius={100}
                            fontSize={10}
                            textColor="#fbbf24"
                        />
                        {/* Inner badge content */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Space Grotesk, sans-serif",
                                    fontSize: "1.6rem",
                                    fontWeight: 800,
                                    color: "#f0f0f0",
                                    lineHeight: 1,
                                }}
                            >
                                KUFF
                            </span>
                            <span
                                style={{
                                    fontFamily: "Space Grotesk, sans-serif",
                                    fontSize: "0.6rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.2em",
                                    color: "#fbbf24",
                                    textTransform: "uppercase",
                                    marginTop: "0.2rem",
                                }}
                            >
                                2026
                            </span>
                        </div>
                    </div>

                    {/* Stats cards */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                            width: "100%",
                            maxWidth: "320px",
                        }}
                    >
                        {[
                            { value: "15+", label: "Films" },
                            { value: "2", label: "Days" },
                            { value: "3", label: "Screens" },
                            { value: "20+", label: "Filmmakers" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                style={{
                                    padding: "1.25rem",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <span
                                    style={{
                                        display: "block",
                                        fontFamily: "Space Grotesk, sans-serif",
                                        fontSize: "1.75rem",
                                        fontWeight: 700,
                                        color: "#06b6d4",
                                        lineHeight: 1,
                                        marginBottom: "0.3rem",
                                    }}
                                >
                                    {stat.value}
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "0.7rem",
                                        color: "#666",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
        </section>
    );
};

export default AboutSection;
