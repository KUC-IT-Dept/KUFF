import React from "react";

interface CurvedLoopProps {
    text?: string;
    speed?: number; // seconds for one loop
}

const CurvedLoop: React.FC<CurvedLoopProps> = ({
    text = "KANNUR UNIVERSITY UNION • KUFF 2026 • ",
    speed = 20,
}) => {
    // Duplicate text many times so at any point the track is full
    const repeated = Array(8).fill(text).join("");

    return (
        <div
            aria-label={text}
            style={{
                overflow: "hidden",
                width: "100%",
                position: "relative",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    whiteSpace: "nowrap",
                    animation: `marquee ${speed}s linear infinite`,
                    willChange: "transform",
                }}
            >
                {/* Two copies so the seam is invisible */}
                <span
                    style={{
                        display: "inline-block",
                        paddingTop: "0.75rem",
                        paddingBottom: "0.75rem",
                        fontSize: "0.8rem",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        color: "#fbbf24",
                    }}
                >
                    {repeated}
                </span>
                <span
                    aria-hidden="true"
                    style={{
                        display: "inline-block",
                        paddingTop: "0.75rem",
                        paddingBottom: "0.75rem",
                        fontSize: "0.8rem",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        color: "#fbbf24",
                    }}
                >
                    {repeated}
                </span>
            </div>
        </div>
    );
};

export default CurvedLoop;
