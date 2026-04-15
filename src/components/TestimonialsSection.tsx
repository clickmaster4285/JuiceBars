import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Maria Santos", role: "Owner, Green Pulse Café", text: "Our checkout time dropped by 60%. Customers are happier, lines are shorter, and my staff actually enjoys the new system. It's been a game-changer for our small café.", rating: 5 },
  { name: "Jake Thompson", role: "Manager, Fresh Squeeze Co.", text: "The ingredient tracking alone saved us thousands in wasted produce. We always know exactly what we have, what's expiring, and when to reorder. Incredible ROI.", rating: 5 },
  { name: "Priya Patel", role: "Founder, VitaBlend", text: "Mobile ordering was the feature our customers were begging for. Since launching, our daily orders jumped by 40%. The loyalty program keeps them coming back.", rating: 5 },
  { name: "Carlos Rivera", role: "Operations Lead, JuiceBox Chain", text: "We rolled this out across 12 locations. Consistent experience, centralized data, and the support team is always just a call away. Best investment we've made.", rating: 5 },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".test-head", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      navigate(1);
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount

  const navigate = (dir: number) => {
    gsap.to(cardRef.current, {
      opacity: 0, x: dir > 0 ? -30 : 30, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
        gsap.fromTo(cardRef.current, { opacity: 0, x: dir > 0 ? 30 : -30 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
      },
    });
  };

  const t = testimonials[current];

  return (
    <section ref={sectionRef} id="testimonials" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 test-head">
          <span className="gradient-bg-purple text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold">Testimonials</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Loved by <span className="gradient-text-purple">Juice Bar Owners</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div ref={cardRef} className="juice-card p-8 md:p-12 text-center relative">
            <Quote className="text-primary/20 mx-auto mb-4" size={48} />
            <p className="font-body text-lg md:text-xl text-foreground leading-relaxed mb-6">"{t.text}"</p>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="text-juice-yellow fill-juice-yellow" size={20} />
              ))}
            </div>
            <h4 className="font-display text-lg font-bold">{t.name}</h4>
            <p className="font-body text-muted-foreground text-sm">{t.role}</p>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${current === i ? "bg-primary w-6" : "bg-muted-foreground/30"}`} />
              ))}
            </div>
            <button onClick={() => navigate(1)} className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;