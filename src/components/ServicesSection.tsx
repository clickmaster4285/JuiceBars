import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Settings, MonitorSmartphone, GraduationCap, Headphones } from "lucide-react";
import setupImg from "@/assets/setup.jpg";
import posImg from "@/assets/pos-system.jpg";
import trainingImg from "@/assets/training.jpg";
import supportImg from "@/assets/support.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Settings, title: "Complete System Setup", desc: "End-to-end installation of hardware and software. We configure everything so you can focus on serving customers from day one.", img: setupImg },
  { icon: MonitorSmartphone, title: "POS Installation", desc: "Professional deployment of our high-speed POS terminals, integrated with your menu, pricing, and payment processors.", img: posImg },
  { icon: GraduationCap, title: "Staff Training", desc: "Hands-on training for your entire team. We ensure everyone is confident and efficient with the new system.", img: trainingImg },
  { icon: Headphones, title: "Ongoing Technical Support", desc: "24/7 dedicated support team ready to resolve any issues. Remote troubleshooting and on-site visits when needed.", img: supportImg },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, x: -40, duration: 0.7, stagger: 0.12, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-orange text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold">Services</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            From Setup to <span className="gradient-text-orange">Success</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div key={i} className="svc-card juice-card overflow-hidden flex flex-col sm:flex-row group">
              <div className="sm:w-48 h-48 sm:h-auto overflow-hidden shrink-0">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={800} height={600} />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="w-10 h-10 rounded-xl gradient-bg-hero flex items-center justify-center mb-3">
                  <s.icon className="text-primary-foreground" size={20} />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
