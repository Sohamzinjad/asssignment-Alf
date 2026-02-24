"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".contact-anim",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSuccess(true);
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-zinc-950 flex justify-center items-center overflow-hidden">
            {/* Background visual element */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <div className="absolute top-[80%] left-[50%] -translate-x-[50%] w-[60vw] h-[40vw] bg-cyan-600/20 rounded-t-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-2xl px-6">
                <div className="text-center mb-16 contact-anim">
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-zinc-100 tracking-tighter mb-4">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Touch</span>
                    </h2>
                    <p className="text-zinc-400 font-light text-lg">
                        Have a project in mind? Let&apos;s talk.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="group relative contact-anim">
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Name"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300 peer"
                        />
                        <div className="absolute inset-0 -z-10 bg-cyan-500/0 rounded-xl blur-md transition-all duration-300 peer-focus:bg-cyan-500/20" />
                    </div>

                    <div className="group relative contact-anim">
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Email"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 peer"
                        />
                        <div className="absolute inset-0 -z-10 bg-purple-500/0 rounded-xl blur-md transition-all duration-300 peer-focus:bg-purple-500/20" />
                    </div>

                    <div className="group relative contact-anim">
                        <textarea
                            name="message"
                            required
                            rows={5}
                            placeholder="Message"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 transition-all duration-300 resize-none peer"
                        />
                        <div className="absolute inset-0 -z-10 bg-emerald-500/0 rounded-xl blur-md transition-all duration-300 peer-focus:bg-emerald-500/20" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="group relative w-full bg-zinc-100 text-zinc-950 font-bold uppercase tracking-widest py-4 rounded-xl overflow-hidden hover:bg-white active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed contact-anim"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                        <span className="relative flex items-center justify-center gap-2 h-6">
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin text-zinc-950" />
                                    Sending...
                                </>
                            ) : success ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    Message Sent
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </span>
                    </button>
                </form>
            </div>
        </section>
    );
}
