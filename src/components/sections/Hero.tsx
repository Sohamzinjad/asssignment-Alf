"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const title1Ref = useRef<HTMLHeadingElement>(null);
    const title2Ref = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.to(bgRef.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, 0);

            if (title1Ref.current && title2Ref.current) {
                const words1 = title1Ref.current.querySelectorAll(".word-inner");
                const words2 = title2Ref.current.querySelectorAll(".word-inner");

                tl.to(
                    [...words1, ...words2],
                    {
                        y: "0%",
                        duration: 1,
                        stagger: 0.1,
                        ease: "expo.out",
                    },
                    0.5
                );
            }

            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                1.2
            );

            tl.fromTo(
                buttonRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
                1.5
            );

            gsap.to(".glow-orb", {
                y: "random(-20, 20)",
                x: "random(-20, 20)",
                scale: "random(0.8, 1.2)",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleScrollToNext = () => {
        const nextSection = document.getElementById("who-we-are");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950"
        >
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 opacity-0 pointer-events-none"
            >
                <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-cyan-700/20 rounded-full blur-[100px] glow-orb mix-blend-screen" />
                <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-purple-700/20 rounded-full blur-[120px] glow-orb mix-blend-screen" />
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30vw] h-[30vw] bg-emerald-700/10 rounded-full blur-[80px] glow-orb mix-blend-screen" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-2 flex flex-col items-center">
                    <div ref={title1Ref} className="text-glow flex gap-[0.3em] overflow-visible">
                        {"Architecture for".split(" ").map((word, i) => (
                            <span key={i} className="overflow-hidden inline-block pb-4 -mb-4">
                                <span className="word-inner inline-block translate-y-[100%]">{word}</span>
                            </span>
                        ))}
                    </div>
                    <div ref={title2Ref} className="flex gap-[0.3em] mt-2 overflow-visible">
                        {"Scale".split(" ").map((word, i) => (
                            <span key={i} className="overflow-hidden inline-block pb-4 -mb-4">
                                <span className="word-inner inline-block translate-y-[100%] bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text pb-2">{word}</span>
                            </span>
                        ))}
                    </div>
                </h1>

                <p ref={textRef} className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl font-light">
                    We build high-performance, resilient systems and robust digital infrastructure for modern enterprises.
                </p>

                <button
                    ref={buttonRef}
                    onClick={handleScrollToNext}
                    className="mt-12 group relative px-8 py-4 bg-zinc-900 border border-zinc-700 rounded-full text-zinc-100 font-medium tracking-wide overflow-hidden hover:border-cyan-400 transition-colors duration-500 glow-cyan"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center gap-2">
                        Explore Platform
                        <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                    </span>
                </button>
            </div>
        </section>
    );
}
