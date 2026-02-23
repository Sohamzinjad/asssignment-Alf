"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhoWeAre() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || !horizontalRef.current || !pinRef.current) return;

        const panels = gsap.utils.toArray<HTMLElement>('.story-panel');
        const totalWidth = horizontalRef.current.scrollWidth - window.innerWidth;

        // This context is no longer needed since we are using ctx2's cleaner approach below.

        const ctx2 = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (window.innerWidth * panels.length),
                }
            });

            panels.forEach((panel, i) => {
                const img = panel.querySelector('.story-img');
                const text = panel.querySelector('.story-text');
            });

        }, containerRef);

        return () => ctx2.revert();
    }, []);

    const stories = [
        {
            title: "Our Origin",
            text: "Born from a desire to build robust, scalable platforms. We engineer software ecosystems designed for long-term growth.",
            img: "images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "The Vision",
            text: "Focusing on performance and maintainability, we deliver seamless technical solutions tailored to complex business needs.",
            img: "images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Our Approach",
            text: "Fusing raw performance with clean interfaces. Every component modular, every millisecond optimized.",
            img: "images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    return (
        <section id="who-we-are" ref={containerRef} className="relative w-full h-screen bg-zinc-950 overflow-hidden">
            <div
                ref={horizontalRef}
                className="flex w-[300vw] h-full"
            >
                {stories.map((story, i) => (
                    <div
                        key={i}
                        className="story-panel w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 gap-12 relative"
                    >
                        <div className="absolute inset-0 z-0 flex justify-center items-center opacity-10 blur-[100px] pointer-events-none">
                            <div className={`w-[40vw] h-[40vw] rounded-full ${i === 0 ? 'bg-cyan-500' : i === 1 ? 'bg-purple-500' : 'bg-emerald-500'}`} />
                        </div>

                        <div className="story-text relative z-10 w-full md:w-1/2 max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-zinc-100 mb-6 flex flex-col">
                                <span className="text-sm font-light text-cyan-400 tracking-widest mb-2">0{i + 1}</span>
                                {story.title}
                            </h2>
                            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
                                {story.text}
                            </p>
                        </div>

                        <div className="relative z-10 w-full md:w-1/2 h-[40vh] md:h-[60vh] max-w-2xl group overflow-hidden rounded-2xl border border-zinc-800">
                            <div
                                className="story-img w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{ backgroundImage: `url(https://${story.img})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
