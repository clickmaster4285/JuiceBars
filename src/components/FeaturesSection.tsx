import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Package, Gift, TabletSmartphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Monitor, title: "Quick POS", desc: "Blazing-fast billing designed for high-traffic juice bars. One-tap orders, split payments, and instant receipts.", gradient: "from-juice-green to-juice-lime" },
  { icon: Package, title: "Ingredient Tracking", desc: "Monitor stock levels in real time. Automatic low-stock alerts and supplier management built right in.", gradient: "from-juice-orange to-juice-yellow" },
  { icon: Gift, title: "Loyalty System", desc: "Customizable rewards programs that drive repeat visits. Digital stamps, points, and exclusive member perks.", gradient: "from-juice-purple to-juice-pink" },
  { icon: TabletSmartphone, title: "Mobile Ordering", desc: "QR-code menus and mobile checkout. Customers order from their phone, you prep faster.", gradient: "from-juice-green to-juice-orange" },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // First, set the initial state explicitly
      gsap.set(".feat-card", { 
        opacity: 0, 
        y: 50, 
        rotation: 3 
      });
      
      // Then animate them in
      gsap.to(".feat-card", {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  // Handle window resize to refresh ScrollTrigger
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={sectionRef} id="features" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-purple text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold inline-block">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Built for <span className="gradient-text-purple">Speed & Simplicity</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="feat-card juice-card p-8 text-center group"
              style={{ opacity: 0, transform: 'translateY(50px) rotate(3deg)' }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <f.icon className="text-primary-foreground" size={30} />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;