import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Clock, Users, DollarSign } from "lucide-react";
import caseStudyImg from "@/assets/case-study.jpg";
import about1 from "@/assets/about-1.jpg";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { icon: Clock, label: "Service Speed", before: "8 min", after: "2.5 min", improvement: "69% faster" },
  { icon: Users, label: "Customer Retention", before: "34%", after: "78%", improvement: "+129%" },
  { icon: DollarSign, label: "Monthly Revenue", before: "$18K", after: "$32K", improvement: "+78%" },
  { icon: TrendingUp, label: "Daily Orders", before: "120", after: "310", improvement: "+158%" },
];

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Kill any existing ScrollTriggers for this section
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === sectionRef.current) {
            trigger.kill();
          }
        });
        
        // Set initial states
        gsap.set(".case-main", { 
          opacity: 0, 
          y: 40 
        });
        
        gsap.set(".case-metric", { 
          opacity: 0, 
          y: 30 
        });
        
        // Animate main card
        gsap.to(".case-main", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          }
        });
        
        // Animate metrics
        gsap.to(".case-metric", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          }
        });
        
        // Refresh ScrollTrigger after setup
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 50);
      }, sectionRef);
      
      return () => ctx.revert();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-sunset text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold inline-block">
            Case Studies
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Real Results, <span className="gradient-text-orange">Real Growth</span>
          </h2>
        </div>

        <div 
          className="juice-card overflow-hidden case-main"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative">
              <img 
                src={caseStudyImg} 
                alt="Tropical Bliss Juice Bar" 
                className="w-full h-full object-cover min-h-[300px]" 
                loading="eager" 
                width={800} 
                height={600} 
              />
              <div className="absolute inset-0 gradient-bg-hero/20" />
              <img 
                src={about1} 
                alt="Interior" 
                className="absolute bottom-4 right-4 w-32 h-24 rounded-xl object-cover shadow-card border-2 border-card" 
                loading="eager" 
                width={800} 
                height={600} 
              />
            </div>
            <div className="p-8 md:p-12">
              <h3 className="font-display text-2xl font-bold mb-2">Tropical Bliss Juice Bar</h3>
              <p className="font-body text-muted-foreground mb-6">A popular juice bar chain struggling with slow service and high ingredient waste transformed their entire operation with our POS and tracking systems. Within 3 months, they saw dramatic improvements across every metric.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((m, i) => (
                  <div 
                    key={i} 
                    className="case-metric rounded-xl bg-muted/50 p-4"
                    style={{ opacity: 0, transform: 'translateY(30px)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <m.icon className="text-primary" size={18} />
                      <span className="font-body text-xs font-semibold text-muted-foreground">{m.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-body text-xs text-muted-foreground line-through">{m.before}</span>
                      <span className="font-display text-lg font-bold text-foreground">{m.after}</span>
                    </div>
                    <span className="font-display text-sm font-bold text-primary">{m.improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;