import React, { useRef, useEffect, useMemo, useState } from "react";
import { skills, Skill, categories } from "@/data/skills";
import AcceternityCard from "./AcceternityCard"; // custom overlay for selected skill


interface CardData {
    title: string;
    description: string;
    hue: number;
    sat: number;
    light: number;
    level: number;
    col: number;
    row: number;
    logo: string;
}

export default function HexSphereGrid(): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    const [isPanning, setIsPanning] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>("");
    const [visibleCount, setVisibleCount] = useState<number>(skills.length);
    // previously used for on-canvas selected card; no longer needed
    const drawnCardsRef = useRef<{ data: CardData; projX: number; projY: number; hexSize: number }[]>([]);
    const themeRef = useRef({
        background: "#0b1220",
        border: "rgba(139, 92, 246, 0.22)",
        accentRgb: { r: 139, g: 92, b: 246 }, // fallback to --accent (#8b5cf6)
        isDark: false,
    });

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
        // apply category filter; empty = all categories
        let allSkills: Skill[] = skills;
        if (filterCategory) {
            allSkills = allSkills.filter((s) => s.category === filterCategory);
        }
        setVisibleCount(allSkills.length);

        const total = allSkills.length;
        const cols = Math.ceil(Math.sqrt(total));
        const rows = Math.ceil(total / cols);

        const cards: CardData[] = [];

        // Fill the entire hex grid (cols * rows) so there are no visible gaps
        const totalSlots = cols * rows;

        for (let slot = 0; slot < totalSlots; slot++) {
            const skill = allSkills[slot % total]; // repeat skills when we run out
            const col = slot % cols;
            const row = Math.floor(slot / cols);

            const baseHue = (slot * 47) % 360; // simple index-based color
            const sat = Math.round(50 + Math.min(100, Math.max(0, skill.level)) * 0.4);
            const light = Math.round(46 + Math.min(100, Math.max(0, skill.level)) * 0.1);

            cards.push({
                title: skill.name,
                description: skill.description,
                hue: Math.round(baseHue),
                sat,
                light,
                level: skill.level,
                col,
                row,
                logo: skill.logo ?? ""
            });
        }

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
    }, [filterCategory]);

    const filterSummary = useMemo(() => {
        return filterCategory ? `Category: ${filterCategory}` : "Category: All";
    }, [filterCategory]);

    useEffect(() => {
        const applyTheme = () => {
            if (typeof window === "undefined") return;
            const styles = getComputedStyle(document.documentElement);
            const bg = styles.getPropertyValue("--card")?.trim();
            const accent = styles.getPropertyValue("--accent")?.trim();
            const border = styles.getPropertyValue("--border")?.trim();

            // Canvas supports modern CSS colors (including oklch) in current browsers,
            // but we still keep an RGB fallback for translucent fills.
            themeRef.current.background = bg || themeRef.current.background;
            themeRef.current.border = border ? border : themeRef.current.border;
            themeRef.current.isDark = document.documentElement.classList.contains("dark");

            // Try to resolve accent to rgb(...) so we can create RGBA strings reliably.
            if (accent) {
                const test = document.createElement("div");
                test.style.color = accent;
                document.body.appendChild(test);
                const resolved = getComputedStyle(test).color; // "rgb(r, g, b)" or "rgba(...)"
                document.body.removeChild(test);
                const m = resolved.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (m) {
                    themeRef.current.accentRgb = { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
                }
            }
        };

        applyTheme();
        const obs = new MutationObserver(applyTheme);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
        return () => obs.disconnect();
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
        const context: CanvasRenderingContext2D = ctx;
        const canvasEl: HTMLCanvasElement = canvas;

        let width = 0;
        let height = 0;

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            width = canvasEl.clientWidth;
            height = canvasEl.clientHeight;
            canvasEl.width = Math.floor(width * dpr);
            canvasEl.height = Math.floor(height * dpr);
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resize();
        window.addEventListener("resize", resize);

        drawnCardsRef.current = [];

        function render() {
            context.clearRect(0, 0, width, height);
            const centerX = width / 2;
            const centerY = height / 2;

            const { offsetX, offsetY, scale } = stateRef.current;
            const baseSize = 60 * scale;
            const cards = cardsRef.current;

            if (cards.length === 0) return;

            const { cols, rows, width: gridWidth, height: gridHeight } = gridBoundsRef.current;
            const scaledGridWidth = gridWidth * scale;
            const scaledGridHeight = gridHeight * scale;

            context.fillStyle = themeRef.current.background;
            context.fillRect(0, 0, width, height);

            // Calculate how many copies we need to cover the viewport
            const copiesX = Math.ceil(width / scaledGridWidth) + 2;
            const copiesY = Math.ceil(height / scaledGridHeight) + 2;

            for (let copyY = -copiesY; copyY <= copiesY; copyY++) {
                for (let copyX = -copiesX; copyX <= copiesX; copyX++) {
                    cards.forEach(card => {
                        // Skip rendering if this is the selected card (it will be rendered separately)
                        if (selectedCard && card === selectedCard) {
                            return;
                        }

                        // Extend the logical hex grid instead of manually offsetting pixels
                        const virtualCol = card.col + copyX * cols;
                        const virtualRow = card.row + copyY * rows;
                        const [hx, hy] = hexToPixel(virtualCol, virtualRow, baseSize);
                        const screenX = centerX + hx + stateRef.current.offsetX;
                        const screenY = centerY + hy + stateRef.current.offsetY;

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
                        context.save();
                        context.globalAlpha = alpha;

                        const gradient = context.createRadialGradient(projX, projY, 0, projX, projY, hexSize);
                        const { r, g, b } = themeRef.current.accentRgb;
                        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.42)`);
                        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.14)`);

                        context.fillStyle = gradient;
                        context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.32)`;
                        context.shadowBlur = 18 * z;
                        context.shadowOffsetX = 0;
                        context.shadowOffsetY = 0;

                        drawRoundedHexPath(context, projX, projY, hexSize - 2, 6);
                        context.fill();

                        // Softer border
                        context.lineWidth = Math.max(0.8, 1.3 * (0.4 + 0.6 * z));
                        context.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.22)`;
                        context.stroke();

                        // Soft shadow
                        context.shadowColor = "rgba(0, 0, 0, 0.35)";
                        context.shadowBlur = 12 * z;
                        context.shadowOffsetY = 4 * z;

                        // === Inner shine / gloss ===
                        context.save();
                        drawRoundedHexPath(context, projX, projY, hexSize - 6, 5)
                        context.clip();

                        const innerGrad = context.createRadialGradient(projX, projY, 0, projX, projY, hexSize);
                        innerGrad.addColorStop(0, "rgba(255,255,255,0.05)");
                        innerGrad.addColorStop(1, "rgba(0,0,0,0.25)");
                        context.fillStyle = innerGrad;
                        context.fillRect(projX - hexSize, projY - hexSize, hexSize * 2, hexSize * 2);
                        context.restore();

                        context.save();
                        if (card.logo) {
                            const logoImg = new Image();
                            logoImg.src = card.logo;

                            // If image fails to load, show name
                            logoImg.onerror = () => {
                                context.font = `${Math.max(10, hexSize * 0.3)}px 'Inter', sans-serif`;
                                context.fillStyle = "rgba(255,255,255,0.85)";
                                context.textAlign = "center";
                                context.textBaseline = "middle";
                                context.fillText(card.title || "Skill", projX, projY);
                            };

                            if (!logoImg.complete) {
                                logoImg.onload = () => {
                                    context.drawImage(
                                        logoImg,
                                        projX - hexSize / 2.2,
                                        projY - hexSize / 2.2,
                                        hexSize / 1.1,
                                        hexSize / 1.1
                                    );
                                };
                            } else {
                                context.drawImage(
                                    logoImg,
                                    projX - hexSize / 2.2,
                                    projY - hexSize / 2.2,
                                    hexSize / 1.1,
                                    hexSize / 1.1
                                );
                            }
                        } else {
                            // Fallback: draw text when no logo present
                            context.font = `${Math.max(10, hexSize * 0.3)}px 'Inter', sans-serif`;
                            context.fillStyle = "rgba(255,255,255,0.85)";
                            context.textAlign = "center";
                            context.textBaseline = "middle";
                            context.fillText(card.title || "Skill", projX, projY);
                        }
                        context.restore();
                        context.restore();
                    });
                }
            }


            // Vignette effect
            const g = context.createRadialGradient(
                centerX,
                centerY,
                Math.min(centerX, centerY) * 0.1,
                centerX,
                centerY,
                Math.max(centerX, centerY)
            );
            g.addColorStop(0, "rgba(0,0,0,0)");
            g.addColorStop(1, themeRef.current.isDark ? "rgba(2,6,20,0.6)" : "rgba(0,0,0,0.14)");
            context.fillStyle = g;
            context.fillRect(0, 0, width, height);

            rafRef.current = requestAnimationFrame(render);
        }

        rafRef.current = requestAnimationFrame(render);
        return () => {
            window.removeEventListener("resize", resize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [selectedCard]); // re-render when selection changes (canvas drawing removed)

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
            {/* header with controls */}
            <div className="absolute top-0 left-0 w-full z-20">
                <div className="m-3 rounded-xl border border-border/50 bg-background/80 backdrop-blur-md shadow-sm">
                    <div className="flex flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-3">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="h-9 min-w-44 rounded-full border border-accent/50 bg-accent/90 px-3 text-sm text-accent-foreground outline-none shadow-sm focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.name} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2 text-sm sm:justify-end">
                            <span className="text-muted-foreground">{filterSummary}</span>
                            <span className="text-muted-foreground/70">•</span>
                            <span className="font-medium text-foreground">{visibleCount}</span>
                            <span className="text-muted-foreground">skills</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* popup appears centered within the grid container */}
            {selectedCard && (
                <AcceternityCard
                    title={selectedCard.title}
                    logo={selectedCard.logo}
                    level={selectedCard.level}
                    description={selectedCard.description}
                    onClose={() => setSelectedCard(null)}
                />
            )}

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