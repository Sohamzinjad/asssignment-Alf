"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Database, Code2, Cloud, Terminal, Boxes, Fingerprint } from "lucide-react";

const techStack = [
    { id: 1, name: "Next.js", type: "Frontend", icon: Code2 },
    { id: 2, name: "Neon DB", type: "Database", icon: Database },
    { id: 3, name: "Vercel", type: "Cloud", icon: Cloud },
    { id: 4, name: "GSAP", type: "Motion", icon: Terminal },
    { id: 5, name: "Web3/Solidity", type: "Blockchain", icon: Boxes },
    { id: 6, name: "Auth.js", type: "Security", icon: Fingerprint }
];

export default function TechStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current,
                { opacity: 0, y: 50, rotationZ: -5 },
                {
                    opacity: 1,
                    y: 0,
                    rotationZ: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 w-full bg-zinc-950 px-6 sm:px-12">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-6 tracking-tight text-zinc-100">
                    Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Capabilities</span>
                </h2>
                <p className="text-center text-zinc-400 mb-20 max-w-2xl mx-auto font-light text-lg">
                    We leverage modern open-source and enterprise technologies to build resilient systems.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techStack.map((tech, i) => (
                        <TechCard
                            key={tech.id}
                            tech={tech}
                            ref={(el) => { cardsRef.current[i] = el; }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

const TechCard = React.forwardRef<HTMLDivElement, { tech: typeof techStack[0] }>(
    ({ tech }, ref) => {
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        return (
            <div
                ref={ref}
                onMouseMove={handleMouseMove}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors"
            >
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(6, 182, 212, 0.15),
                transparent 80%
              )
            `,
                    }}
                />

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800 mb-6 group-hover:border-cyan-500/50 transition-colors duration-300">
                        <tech.icon className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                    <p className="text-sm font-medium text-cyan-400/80 mb-2 tracking-widest uppercase">{tech.type}</p>
                    <h3 className="text-2xl font-bold text-zinc-100">{tech.name}</h3>
                </div>
            </div>
        );
    }
);
TechCard.displayName = "TechCard";
