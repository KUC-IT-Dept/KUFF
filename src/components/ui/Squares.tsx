import React, { useEffect, useRef } from "react";

interface SquaresProps {
    squareSize?: number;
    strokeColor?: string;
    className?: string;
}

const Squares: React.FC<SquaresProps> = ({
    squareSize = 40,
    strokeColor = "rgba(255,255,255,0.06)",
    className = "",
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offsetRef = useRef({ x: 0, y: 0 });
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;

        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1;

            const ox = offsetRef.current.x % squareSize;
            const oy = offsetRef.current.y % squareSize;

            for (let x = ox - squareSize; x < width + squareSize; x += squareSize) {
                for (let y = oy - squareSize; y < height + squareSize; y += squareSize) {
                    ctx.beginPath();
                    ctx.rect(x, y, squareSize, squareSize);
                    ctx.stroke();
                }
            }

            offsetRef.current.x += 0.15;
            offsetRef.current.y += 0.1;

            animFrameRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            ro.disconnect();
        };
    }, [squareSize, strokeColor]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
            }}
            className={className}
        />
    );
};

export default Squares;
