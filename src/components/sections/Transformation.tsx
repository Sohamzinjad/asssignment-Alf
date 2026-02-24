"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Shield, Zap, Rocket } from "lucide-react";

const nodes = [
    {
        id: 1,
        title: "Discovery & Arch",
        desc: "Architecture planning and robust system design.",
        icon: Database,
        color: "cyan"
    },
    {
        id: 2,
        title: "Security & Compliance",
        desc: "Security implementation and comprehensive compliance.",
        icon: Shield,
        color: "purple"
    },
    {
        id: 3,
        title: "Rapid Execution",
        desc: "Infrastructure orchestration and automated deployment.",
        icon: Zap,
        color: "emerald"
    },
    {
        id: 4,
        title: "Continuous Scale",
        desc: "Continuous integration, monitoring, and scaling.",
        icon: Rocket,
        color: "cyan"
    }
];

export default function Transformation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || !pathRef.current) return;


        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });

        const ctx = gsap.context(() => {

            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                }
            });


            const nodeElements = gsap.utils.toArray<HTMLElement>('.timeline-node');
            nodeElements.forEach((node) => {
                gsap.fromTo(node,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        ease: "back.out(1.5)",
                        scrollTrigger: {
                            trigger: node,
                            start: "top center+=100",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-zinc-950 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_left_center,rgba(6,182,212,0.1),transparent_50%),radial-gradient(circle_at_right_center,rgba(168,85,247,0.1),transparent_50%)]" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-24 tracking-tighter">
                    Our Implementation <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Model</span>
                </h2>

                <div className="relative flex flex-col items-center">

                    <div className="absolute top-0 bottom-0 left-[50%] -translate-x-[50%] w-[4px]">
                        <svg
                            className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[4px]"
                            preserveAspectRatio="none"
                            fill="none"
                        >
                            <line
                                x1="2" y1="0" x2="2" y2="100%"
                                className="stroke-zinc-800"
                                strokeWidth="4"
                            />
                            <path
                                ref={pathRef}
                                d="M 2 0 L 2 10000"
                                className="stroke-cyan-400"
                                strokeWidth="4"
                                style={{
                                    filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))"
                                }}
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-32 w-full">
                        {nodes.map((node, i) => (
                            <div
                                key={node.id}
                                className={`timeline-node relative flex items-center justify-between w-full ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >

                                <div className={`w-[45%] ${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                                    <h3 className="text-2xl font-bold text-zinc-100 mb-3">{node.title}</h3>
                                    <p className="text-zinc-400 tracking-wide leading-relaxed">{node.desc}</p>
                                </div>


                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-zinc-950 border border-zinc-700 relative group glow-${node.color} hover:scale-110 transition-transform duration-300 cursor-pointer`}>
                                        <div className={`absolute inset-0 rounded-full bg-${node.color}-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                        <node.icon className={`w-6 h-6 text-${node.color}-400 relative z-10`} />
                                    </div>
                                </div>


                                <div className="w-[45%]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
