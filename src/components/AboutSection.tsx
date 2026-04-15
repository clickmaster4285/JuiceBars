import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, TrendingUp, Sparkles } from "lucide-react";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-img", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, x: -60, duration: 1, stagger: 0.2, ease: "power3.out",
      });
      gsap.from(".about-text", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-hero text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold about-text">About Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4 about-text">
            Powering the <span className="gradient-text">Future of Juice Bars</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={about1} alt="Modern juice bar" className="about-img rounded-2xl shadow-card w-full" loading="lazy" width={800} height={600} />
            <img src={about2} alt="Barista making smoothie" className="about-img absolute -bottom-8 -right-4 w-48 md:w-64 rounded-2xl shadow-card border-4 border-card" loading="lazy" width={800} height={600} />
          </div>

          <div className="space-y-6">
            <div className="about-text flex gap-4 items-start juice-card p-6">
              <div className="w-12 h-12 rounded-xl gradient-bg-hero flex items-center justify-center shrink-0">
                <Target className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold mb-1">Our Vision</h3>
                <p className="font-body text-muted-foreground">We started with a vision to help food businesses deliver faster and better customer experiences through technology. Today, we create powerful, scalable systems tailored for fast-paced juice bars and smoothie shops.</p>
              </div>
            </div>
            <div className="about-text flex gap-4 items-start juice-card p-6">
              <div className="w-12 h-12 rounded-xl gradient-bg-orange flex items-center justify-center shrink-0">
                <TrendingUp className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold mb-1">Growing Brands</h3>
                <p className="font-body text-muted-foreground">From small health-focused cafés to growing beverage brands, our solutions simplify operations, improve efficiency, and enhance customer satisfaction.</p>
              </div>
            </div>
            <div className="about-text flex gap-4 items-start juice-card p-6">
              <div className="w-12 h-12 rounded-xl gradient-bg-purple flex items-center justify-center shrink-0">
                <Sparkles className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold mb-1">Smart Operations</h3>
                <p className="font-body text-muted-foreground">Our expertise in POS systems, inventory tracking, and automation helps juice bars operate smarter, faster, and more profitably.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
