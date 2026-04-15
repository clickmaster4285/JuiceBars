import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const images = [hero1, hero2, hero3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(headlineRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .fromTo(subRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .fromTo(ctaRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3");
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: current === i ? 1 : 0 }}
        >
          <img
            src={img}
            alt={`Juice bar hero ${i + 1}`}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            {...(i !== 0 ? { loading: "lazy" as const } : {})}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />

      {/* Floating decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-juice-green/20 blur-2xl float-animation" />
      <div className="absolute bottom-32 right-16 w-40 h-40 rounded-full bg-juice-orange/20 blur-2xl float-animation-delay" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-juice-purple/15 blur-xl float-animation-slow" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1
          ref={headlineRef}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ color: "hsl(0 0% 100%)" }}
        >
          Fresh Drinks.{" "}
          <span className="gradient-text">Faster Orders.</span>
          <br />
          Better Experience.
        </h1>
        <p
          ref={subRef}
          className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "hsl(0 0% 90%)" }}
        >
          Streamline your juice bar operations with fast, modern, and efficient POS solutions built for high-demand environments.
        </p>
        <button
          ref={ctaRef}
          onClick={scrollToContact}
          className="gradient-bg-hero rounded-full px-10 py-4 font-display font-bold text-lg text-primary-foreground shadow-glow-green transition-all hover:scale-105 hover:shadow-xl"
        >
          Get Started Today
        </button>
      </div>

      {/* Bottom carousel indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === i ? "bg-primary w-8" : "bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
