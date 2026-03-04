import React, { useMemo } from "react";

interface CircularTextProps {
    text: string;
    radius?: number;
    fontSize?: number;
    className?: string;
    textColor?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
    text,
    radius = 80,
    fontSize = 10,
    className = "",
    textColor = "#fbbf24",
}) => {
    const id = useMemo(
        () => `circular-path-${Math.random().toString(36).slice(2, 8)}`,
        []
    );
    const size = (radius + fontSize) * 2 + 10;
    const cx = size / 2;
    const cy = size / 2;
    const d = `M ${cx},${cy - radius} A ${radius},${radius} 0 1,1 ${cx - 0.01},${cy - radius}`;

    const repeatedText = `${text} ${text} `;

    return (
        <div
            className={`inline-flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            aria-label={text}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ animation: "spin-slow 12s linear infinite" }}
            >
                <defs>
                    <path id={id} d={d} />
                </defs>
                <text
                    fontSize={fontSize}
                    fill={textColor}
                    fontFamily="Space Grotesk, sans-serif"
                    fontWeight="600"
                    letterSpacing="2"
                >
                    <textPath href={`#${id}`} startOffset="0%">
                        {repeatedText}
                    </textPath>
                </text>
            </svg>
        </div>
    );
};

export default CircularText;
