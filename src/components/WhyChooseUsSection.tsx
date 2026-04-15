import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, MousePointerClick, Building2, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { icon: Rocket, title: "Built for Speed & Efficiency", desc: "Every millisecond counts during rush hour. Our system is optimized for lightning-fast transactions.", color: "bg-juice-green" },
  { icon: MousePointerClick, title: "Easy-to-Use Interface", desc: "Intuitive design means zero learning curve. Your staff will be up and running in minutes, not days.", color: "bg-juice-orange" },
  { icon: Building2, title: "Designed for High-Volume", desc: "Whether you serve 100 or 10,000 customers a day, our infrastructure scales seamlessly with your growth.", color: "bg-juice-purple" },
  { icon: ShieldCheck, title: "Scalable & Reliable", desc: "99.9% uptime guarantee. Cloud-backed infrastructure ensures your system never goes down when you need it most.", color: "bg-juice-lime" },
];

const WhyChooseUsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-fresh text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            The <span className="gradient-text">Smart Choice</span> for Juice Bars
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div key={i} className="why-card juice-card p-8 text-center group relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 ${r.color}`} />
              <div className={`w-14 h-14 rounded-full ${r.color}/15 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110`}>
                <r.icon className={`${r.color.replace('bg-', 'text-')}`} size={28} />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{r.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
