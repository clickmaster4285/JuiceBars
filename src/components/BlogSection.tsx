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
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-orange text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold">Blog</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Fresh <span className="gradient-text-orange">Insights</span> & Tips
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((b, i) => (
            <div key={i} className="blog-card juice-card overflow-hidden group cursor-pointer">
              <div className="relative h-52 overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={600} height={600} />
                <span className="absolute top-4 left-4 gradient-bg-hero text-primary-foreground px-3 py-1 rounded-full font-display text-xs font-semibold">{b.tag}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <Calendar size={14} />
                  <span className="font-body">{b.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">{b.desc}</p>
                <span className="font-display text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
