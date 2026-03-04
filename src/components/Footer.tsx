import React from "react";
import { Film, Heart } from "lucide-react";

const MADE_BY = "KU Tech Club"; // ← Change this to your name

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                background: "#050505",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "3rem 1.5rem",
            }}
        >
            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.5rem",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <Film size={18} color="#f72585" />
                    <span
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            letterSpacing: "0.12em",
                            color: "#f0f0f0",
                        }}
                    >
                        KUFF
                    </span>
                    <span
                        style={{
                            fontSize: "0.55rem",
                            fontFamily: "Space Grotesk, sans-serif",
                            color: "#fbbf24",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            padding: "2px 5px",
                            border: "1px solid rgba(251,191,36,0.35)",
                            borderRadius: "3px",
                        }}
                    >
                        2026
                    </span>
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: "40px",
                        height: "1px",
                        background: "rgba(255,255,255,0.1)",
                    }}
                />

                {/* Links */}
                <div
                    style={{
                        display: "flex",
                        gap: "2rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {["Home", "Films", "About"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.78rem",
                                color: "#666",
                                textDecoration: "none",
                                transition: "color 0.2s",
                                letterSpacing: "0.05em",
                            }}
                            onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLElement).style.color = "#f0f0f0")
                            }
                            onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLElement).style.color = "#666")
                            }
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <p
                    style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.73rem",
                        color: "#444",
                        textAlign: "center",
                        lineHeight: 1.7,
                    }}
                >
                    © 2026 Kannur University Union. All rights reserved.
                    <br />
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            marginTop: "0.25rem",
                            color: "#555",
                        }}
                    >
                        Website made with{" "}
                        <Heart size={11} style={{ color: "#f72585" }} fill="#f72585" /> by{" "}
                        <strong style={{ color: "#888" }}>{MADE_BY}</strong>
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
