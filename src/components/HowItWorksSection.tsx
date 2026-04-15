import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MonitorCog, SlidersHorizontal, Utensils } from "lucide-react";
import setupImg from "@/assets/setup.jpg";
import posImg from "@/assets/pos-system.jpg";
import about1 from "@/assets/about-1.jpg";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", icon: MonitorCog, title: "Setup Your System", desc: "We install and configure the entire POS ecosystem — hardware, software, payment integration — tailored to your juice bar's unique workflow.", img: setupImg },
  { num: "02", icon: SlidersHorizontal, title: "Customize Your Workflow", desc: "Design your menu, set up ingredient tracking, configure loyalty programs, and fine-tune every aspect to match how your team works best.", img: posImg },
  { num: "03", icon: Utensils, title: "Start Serving Customers", desc: "Go live with confidence. Your team is trained, your system is optimized, and your customers enjoy a seamless ordering experience.", img: about1 },
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      tl.from(".step-item", { opacity: 0, x: -60, duration: 0.7, stagger: 0.25, ease: "power3.out" })
        .from(".step-line", { scaleY: 0, duration: 0.6, ease: "power2.out" }, "-=0.8");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-hero text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold">How It Works</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Three Steps to <span className="gradient-text">Transform</span> Your Bar
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 relative">
          <div className="step-line absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-juice-green/50 to-juice-orange origin-top hidden md:block" />
          
          {steps.map((s, i) => (
            <div key={i} className="step-item flex gap-6 md:gap-10 items-start relative">
              <div className="w-16 h-16 rounded-2xl gradient-bg-hero flex items-center justify-center shrink-0 z-10 font-display font-bold text-primary-foreground text-lg">
                {s.num}
              </div>
              <div className="juice-card overflow-hidden flex-1 flex flex-col sm:flex-row group">
                <div className="sm:w-56 h-48 sm:h-auto overflow-hidden shrink-0">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={800} height={600} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className="text-primary" size={20} />
                    <h3 className="font-display text-xl font-bold">{s.title}</h3>
                  </div>
                  <p className="font-body text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
