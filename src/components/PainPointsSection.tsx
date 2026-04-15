import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Leaf, ShieldAlert, UserMinus } from "lucide-react";
import caseStudyImg from "@/assets/case-study.jpg";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  { icon: Clock, title: "Slow Service During Peak Hours", desc: "Long wait times frustrate customers and drive them away. Without a fast, reliable system, your staff struggles to keep up with demand during rush hours, leading to lost revenue and poor reviews.", color: "gradient-bg-orange" },
  { icon: Leaf, title: "Difficulty Managing Fresh Ingredients", desc: "Fresh produce spoils fast. Without real-time inventory tracking, you're either over-ordering (wasting money) or running out of key ingredients mid-shift, disappointing customers.", color: "gradient-bg-fresh" },
  { icon: ShieldAlert, title: "Inconsistent Order Handling", desc: "Manual processes lead to mistakes — wrong orders, missing add-ons, and confused staff. Inconsistency hurts your brand reputation and slows down your entire workflow.", color: "gradient-bg-purple" },
  { icon: UserMinus, title: "Low Customer Retention", desc: "Without loyalty programs or personalized experiences, customers have no reason to come back. You're constantly chasing new customers instead of building a loyal base.", color: "gradient-bg-sunset" },
];

const PainPointsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pain-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="gradient-bg-orange text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold">The Problem</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Challenges That <span className="gradient-text-orange">Hold You Back</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">Every juice bar faces these obstacles — but they don't have to.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {painPoints.map((p, i) => (
            <div key={i} className="pain-card juice-card p-8 flex gap-5">
              <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center shrink-0`}>
                <p.icon className="text-primary-foreground" size={28} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pain-card overflow-hidden">
          <img src={caseStudyImg} alt="Busy juice bar" className="w-full h-64 object-cover" loading="lazy" width={800} height={600} />
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
