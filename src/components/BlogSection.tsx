import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  { img: blog1, title: "Top 10 Superfoods Every Juice Bar Should Stock in 2026", desc: "Discover the trending ingredients that health-conscious customers are craving — from adaptogens to exotic berries.", date: "Apr 10, 2026", tag: "Health Tips" },
  { img: blog2, title: "How Green Smoothies Became a $3B Industry", desc: "The rise of green smoothies and what it means for juice bar owners looking to capitalize on the health movement.", date: "Apr 5, 2026", tag: "Industry" },
  { img: blog3, title: "5 Tech Upgrades That Double Juice Bar Revenue", desc: "From mobile ordering to AI-powered inventory, these technology investments deliver the highest ROI for beverage businesses.", date: "Mar 28, 2026", tag: "Business" },
];

const BlogSection = () => {
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
        
        // Set initial state
        gsap.set(".blog-card", { 
          opacity: 0, 
          y: 50 
        });
        
        // Animate in
        gsap.to(".blog-card", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
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
    <section ref={sectionRef} id="blog" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-orange text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold inline-block">
            Blog
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Fresh <span className="gradient-text-orange">Insights</span> & Tips
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((b, i) => (
            <div 
              key={i} 
              className="blog-card juice-card overflow-hidden group cursor-pointer"
              style={{ opacity: 0, transform: 'translateY(50px)' }}
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={b.img} 
                  alt={b.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="eager" 
                  width={600} 
                  height={600} 
                />
                <span className="absolute top-4 left-4 gradient-bg-hero text-primary-foreground px-3 py-1 rounded-full font-display text-xs font-semibold">{b.tag}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <Calendar size={14} />
                  <span className="font-body">{b.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">{b.desc}</p>
             
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;