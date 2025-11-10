import React, { useRef, useEffect, useState } from "react";
import { skillCategories, Skill } from "@/data/skills";

interface CardData {
    title: string;
    hue: number;
    sat: number;
    light: number;
    level: number;
    category: string;
    col: number;
    row: number;
    logo: string;
}

export default function HexSphereGrid(): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    const [isPanning, setIsPanning] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
    const scaleFactor = 2.5; // 👈 Development control - change this value as needed
    const drawnCardsRef = useRef<{ data: CardData; projX: number; projY: number; hexSize: number }[]>([]);

    const stateRef = useRef({
        offsetX: 0,
        offsetY: 0,
        scale: 1,
        pointerDown: false,
        lastPx: 0,
        lastPy: 0,
    });

    const cardsRef = useRef<CardData[]>([]);
    const gridBoundsRef = useRef({ cols: 0, rows: 0, width: 0, height: 0 });

    useEffect(() => {
        const allSkills: Skill[] = skillCategories.flatMap((c) => c.skills);
        const total = allSkills.length;
        const categoryMap = new Map<string, number>();

        skillCategories.forEach((c, i) => {
            categoryMap.set(c.title, (i * 360) / Math.max(1, skillCategories.length));
        });

        // Calculate square grid dimensions
        const cols = Math.ceil(Math.sqrt(total));
        const rows = Math.ceil(total / cols);

        const cards: CardData[] = [];

        allSkills.forEach((skill, idx) => {
            const col = idx % cols;
            const row = Math.floor(idx / cols);

            const baseHue = categoryMap.get(skill.category) ?? ((idx * 47) % 360);
            const sat = Math.round(50 + Math.min(100, Math.max(0, skill.level)) * 0.4);
            const light = Math.round(46 + Math.min(100, Math.max(0, skill.level)) * 0.1);

            cards.push({
                title: skill.name,
                hue: Math.round(baseHue),
                sat,
                light,
                level: skill.level,
                category: skill.category,
                col,
                row,
                logo: skill.logo
            });
        });

        cardsRef.current = cards;

        // Calculate grid bounds
        const baseSize = 60;
        const hexWidth = baseSize * Math.sqrt(3);
        const hexHeight = baseSize * 1.5;

        gridBoundsRef.current = {
            cols,
            rows,
            width: cols * hexWidth + hexWidth / 2,
            height: rows * hexHeight
        };
    }, []);

    // Utility functions
    function hexToPixel(col: number, row: number, size: number): [number, number] {
        const x = col * size * Math.sqrt(3) + (row % 2) * (size * Math.sqrt(3)) / 2;
        const y = row * size * 1.5;
        return [x, y];
    }

    function drawHexPath(
        ctx: CanvasRenderingContext2D,
        cx: number,
        cy: number,
        size: number
    ): void {
        const angleOffset = Math.PI / 6;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i + angleOffset;
            const x = cx + size * Math.cos(a);
            const y = cy + size * Math.sin(a);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
    }

    function drawRoundedHexPath(
        ctx: CanvasRenderingContext2D,
        cx: number,
        cy: number,
        size: number,
        radius: number
    ): void {
        const angleOffset = Math.PI / 6;
        const points: [number, number][] = [];

        for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i + angleOffset;
            const x = cx + size * Math.cos(a);
            const y = cy + size * Math.sin(a);
            points.push([x, y]);
        }

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[(i + 1) % 6];
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const insetX1 = x1 + radius * Math.cos(angle);
            const insetY1 = y1 + radius * Math.sin(angle);
            const insetX2 = x2 - radius * Math.cos(angle);
            const insetY2 = y2 - radius * Math.sin(angle);

            if (i === 0) ctx.moveTo(insetX1, insetY1);
            else ctx.lineTo(insetX1, insetY1);

            ctx.quadraticCurveTo(x2, y2, insetX2, insetY2);
        }
        ctx.closePath();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resize();
        window.addEventListener("resize", resize);

        drawnCardsRef.current = [];

        function render() {
            ctx.clearRect(0, 0, width, height);
            const centerX = width / 2;
            const centerY = height / 2;

            const { offsetX, offsetY, scale } = stateRef.current;
            const baseSize = 60 * scale;
            const cards = cardsRef.current;

            if (cards.length === 0) return;

            const { cols, rows, width: gridWidth, height: gridHeight } = gridBoundsRef.current;
            const scaledGridWidth = gridWidth * scale;
            const scaledGridHeight = gridHeight * scale;

            ctx.fillStyle = "#071126";
            ctx.fillRect(0, 0, width, height);

            // Calculate how many copies we need to cover the viewport
            const copiesX = Math.ceil(width / scaledGridWidth) + 2;
            const copiesY = Math.ceil(height / scaledGridHeight) + 2;

            for (let copyY = -copiesY; copyY <= copiesY; copyY++) {
                for (let copyX = -copiesX; copyX <= copiesX; copyX++) {

                    // True hex geometry offsets
                    const baseSize = 60 * scale;
                    const hexWidth = baseSize * Math.sqrt(3);
                    const hexHeight = baseSize * 1.5;
                    const spacingX = 0.93;
                    const spacingY = 1.03;
                    // Each full grid's total width and height
                    const { cols, rows } = gridBoundsRef.current;
                    const gridW = cols * hexWidth + hexWidth / 2;
                    const gridH = rows * hexHeight;

                    const offsetX = copyX * gridW * spacingX + (copyY % 2 ? hexWidth / 2 : 0);
                    const offsetY = copyY * gridH * 0.97 * spacingY;
                    cards.forEach(card => {
                        // Skip rendering if this is the selected card (it will be rendered separately)
                        if (selectedCard && card === selectedCard) {
                            return;
                        }

                        const [hx, hy] = hexToPixel(card.col, card.row, baseSize);
                        const screenX = centerX + hx + stateRef.current.offsetX + offsetX;
                        const screenY = centerY + hy + stateRef.current.offsetY + offsetY;

                        // Culling
                        if (screenX < -baseSize * 3 || screenX > width + baseSize * 3 ||
                            screenY < -baseSize * 3 || screenY > height + baseSize * 3) {
                            return;
                        }

                        const dx = screenX - centerX;
                        const dy = screenY - centerY;
                        const dist = Math.hypot(dx, dy);
                        const norm = Math.min(1, dist / (Math.min(centerX, centerY) * 0.95));
                        const z = Math.sqrt(1 - Math.min(1, norm * norm));
                        const perspectiveScale = 0.45 + 0.55 * z;
                        const projX = centerX + dx * (0.9 + 0.1 * z);
                        const projY = centerY + dy * (0.9 + 0.1 * z) + (1 - z) * 30;
                        const hexSize = baseSize * perspectiveScale * (1 - Math.min(0.5, norm * 0.5));
                        const alpha = 0.28 + 0.72 * z;

                        drawnCardsRef.current.push({ data: card, projX, projY, hexSize });

                        // === Modern Indigo Gradient Hex Card ===
                        ctx.save();
                        ctx.globalAlpha = alpha;

                        const gradient = ctx.createRadialGradient(projX, projY, 0, projX, projY, hexSize);
                        gradient.addColorStop(0, "rgba(99, 102, 241, 0.55)");
                        gradient.addColorStop(1, "rgba(67, 56, 202, 0.25)");

                        ctx.fillStyle = gradient;
                        ctx.shadowColor = "rgba(99, 102, 241, 0.45)";
                        ctx.shadowBlur = 18 * z;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 0;

                        drawRoundedHexPath(ctx, projX, projY, hexSize - 2, 6);
                        ctx.fill();

                        // Softer border
                        ctx.lineWidth = Math.max(0.8, 1.3 * (0.4 + 0.6 * z));
                        ctx.strokeStyle = "rgba(99,102,241,0.25)";
                        ctx.stroke();

                        // Soft shadow
                        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
                        ctx.shadowBlur = 12 * z;
                        ctx.shadowOffsetY = 4 * z;

                        // === Inner shine / gloss ===
                        ctx.save();
                        drawRoundedHexPath(ctx, projX, projY, hexSize - 6, 5)
                        ctx.clip();

                        const innerGrad = ctx.createRadialGradient(projX, projY, 0, projX, projY, hexSize);
                        innerGrad.addColorStop(0, "rgba(255,255,255,0.05)");
                        innerGrad.addColorStop(1, "rgba(0,0,0,0.25)");
                        ctx.fillStyle = innerGrad;
                        ctx.fillRect(projX - hexSize, projY - hexSize, hexSize * 2, hexSize * 2);
                        ctx.restore();

                        ctx.save();
                        if (card.logo) {
                            const logoImg = new Image();
                            logoImg.src = card.logo;

                            // If image fails to load, show name
                            logoImg.onerror = () => {
                                ctx.font = `${Math.max(10, hexSize * 0.3)}px 'Inter', sans-serif`;
                                ctx.fillStyle = "rgba(255,255,255,0.85)";
                                ctx.textAlign = "center";
                                ctx.textBaseline = "middle";
                                ctx.fillText(card.title || "Skill", projX, projY);
                            };

                            if (!logoImg.complete) {
                                logoImg.onload = () => {
                                    ctx.drawImage(
                                        logoImg,
                                        projX - hexSize / 2.2,
                                        projY - hexSize / 2.2,
                                        hexSize / 1.1,
                                        hexSize / 1.1
                                    );
                                };
                            } else {
                                ctx.drawImage(
                                    logoImg,
                                    projX - hexSize / 2.2,
                                    projY - hexSize / 2.2,
                                    hexSize / 1.1,
                                    hexSize / 1.1
                                );
                            }
                        } else {
                            // Fallback: draw text when no logo present
                            ctx.font = `${Math.max(10, hexSize * 0.3)}px 'Inter', sans-serif`;
                            ctx.fillStyle = "rgba(255,255,255,0.85)";
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillText(card.title || "Skill", projX, projY);
                        }
                        ctx.restore();
                        ctx.restore();
                    });
                }
            }

            // === Render selected card in center with scaling factor ===
            if (selectedCard) {
                const largeSize = 60 * scaleFactor; // Use the scale factor here
                const cx = centerX;
                const cy = centerY;

                ctx.save();
                ctx.globalAlpha = 0.95;

                // Enhanced glow for selected card
                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, largeSize);
                gradient.addColorStop(0, "rgba(99, 102, 241, 0.8)");
                gradient.addColorStop(0.7, "rgba(67, 56, 202, 0.4)");
                gradient.addColorStop(1, "rgba(67, 56, 202, 0.2)");

                ctx.fillStyle = gradient;
                ctx.shadowColor = "rgba(99, 102, 241, 0.9)";
                ctx.shadowBlur = 40;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                drawRoundedHexPath(ctx, cx, cy, largeSize, 12);
                ctx.fill();

                // Border for selected card
                ctx.lineWidth = 3;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
                ctx.stroke();

                // Inner content (logo + name)
                ctx.save();

                if (selectedCard.logo) {
                    const logoImg = new Image();
                    logoImg.src = selectedCard.logo;

                    const drawLogoAndText = () => {
                        // Draw logo
                        ctx.drawImage(
                            logoImg,
                            cx - largeSize / 2.5,
                            cy - largeSize / 2.5,
                            largeSize / 1.25,
                            largeSize / 1.25
                        );

                        // Draw skill name below
                        ctx.font = `bold 10px 'Inter', sans-serif`;
                        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "top";
                        ctx.fillText(selectedCard.title, cx, cy + largeSize * 0.6);
                    };

                    if (!logoImg.complete) {
                        logoImg.onload = drawLogoAndText;
                    } else {
                        drawLogoAndText();
                    }
                } else {
                    // Fallback: just text
                    ctx.font = `bold ${Math.max(16, largeSize * 0.2)}px 'Inter', sans-serif`;
                    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(selectedCard.title, cx, cy);
                }

                ctx.restore();
                ctx.restore();
            }

            // Vignette effect
            const g = ctx.createRadialGradient(
                centerX,
                centerY,
                Math.min(centerX, centerY) * 0.1,
                centerX,
                centerY,
                Math.max(centerX, centerY)
            );
            g.addColorStop(0, "rgba(0,0,0,0)");
            g.addColorStop(1, "rgba(2,6,20,0.6)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);

            rafRef.current = requestAnimationFrame(render);
        }

        rafRef.current = requestAnimationFrame(render);
        return () => {
            window.removeEventListener("resize", resize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [selectedCard, scaleFactor]); // Add dependencies to re-render when selection or scale changes

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const toCanvasCoords = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const onPointerDown = (e: PointerEvent) => {
            const p = toCanvasCoords(e);
            const state = stateRef.current;
            state.pointerDown = true;
            state.lastPx = p.x;
            state.lastPy = p.y;

            try {
                canvas.setPointerCapture(e.pointerId);
            } catch {
                /* ignore */
            }
            setIsPanning(true);
        };

        const onPointerMove = (e: PointerEvent) => {
            const p = toCanvasCoords(e);
            const state = stateRef.current;
            if (!state.pointerDown) return;
            const dx = p.x - state.lastPx;
            const dy = p.y - state.lastPy;
            state.lastPx = p.x;
            state.lastPy = p.y;
            if (isPanning) {
                state.offsetX += dx;
                state.offsetY += dy;
            }
        };

        const onPointerUp = (e: PointerEvent) => {
            const state = stateRef.current;
            state.pointerDown = false;
            canvas.releasePointerCapture(e.pointerId);
            setIsPanning(false);
        };

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            for (const card of drawnCardsRef.current) {
                const dx = mouseX - card.projX;
                const dy = mouseY - card.projY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < card.hexSize * 0.9) {
                    setSelectedCard(card.data);
                    return;
                }
            }

            // If clicked empty space, deselect
            setSelectedCard(null);
        };

        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointermove", onPointerMove);
        canvas.addEventListener("pointerup", onPointerUp);
        canvas.addEventListener("pointercancel", onPointerUp);
        canvas.addEventListener("click", handleClick);

        return () => {
            canvas.removeEventListener("pointerdown", onPointerDown);
            canvas.removeEventListener("pointermove", onPointerMove);
            canvas.removeEventListener("pointerup", onPointerUp);
            canvas.removeEventListener("pointercancel", onPointerUp);
            canvas.removeEventListener("click", handleClick);
        };
    }, [isPanning]);

    return (
        <div className="w-full h-full relative">
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    touchAction: "none",
                    cursor: isPanning ? "grabbing" : "grab",
                }}
            />
        </div>
    );
}