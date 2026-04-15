import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, LeafyGreen, Heart, Smartphone } from "lucide-react";
import posImg from "@/assets/pos-system.jpg";
import ingredientsImg from "@/assets/ingredients.jpg";
import loyaltyImg from "@/assets/loyalty.jpg";
import mobileImg from "@/assets/mobile-order.jpg";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  { icon: Zap, title: "Lightning-Fast POS", desc: "Process orders in seconds with our optimized checkout system. Handle peak-hour rushes with zero lag.", img: posImg, color: "gradient-bg-hero" },
  { icon: LeafyGreen, title: "Ingredient Freshness Tracking", desc: "Real-time inventory alerts ensure you never run out or waste fresh produce. Track expiry, reorder points, and supplier data.", img: ingredientsImg, color: "gradient-bg-fresh" },
  { icon: Heart, title: "Smart Loyalty Programs", desc: "Reward repeat customers automatically. Points, stamps, birthday rewards — keep them coming back for more.", img: loyaltyImg, color: "gradient-bg-purple" },
  { icon: Smartphone, title: "Mobile Ordering", desc: "Let customers order ahead via mobile. Reduce in-store queues and boost order accuracy with digital menus.", img: mobileImg, color: "gradient-bg-orange" },
];

const SolutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // First, set the initial state explicitly
      gsap.set(".sol-card", { 
        opacity: 0, 
        scale: 0.9 
      });
      
      // Then animate them in
      gsap.to(".sol-card", {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-fresh text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold inline-block">
            Our Solutions
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Everything You Need to <span className="gradient-text">Serve Faster</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((s, i) => (
            <div key={i} className="sol-card juice-card overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={s.img} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="eager" 
                  width={800} 
                  height={600} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}>
                  <s.icon className="text-primary-foreground" size={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;