import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Phone, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-el", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Thanks! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 contact-el">
          <span className="gradient-bg-fresh text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold">Contact Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-lg">Drop us a line and we'll set up a free demo for your juice bar.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6 contact-el">
            <div className="juice-card p-6 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl gradient-bg-hero flex items-center justify-center shrink-0">
                <Phone className="text-primary-foreground" size={22} />
              </div>
              <div>
                <h4 className="font-display font-bold">Call Us</h4>
                <p className="font-body text-muted-foreground text-sm">+1 (555) 234-5678</p>
              </div>
            </div>
            <div className="juice-card p-6 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl gradient-bg-orange flex items-center justify-center shrink-0">
                <Mail className="text-primary-foreground" size={22} />
              </div>
              <div>
                <h4 className="font-display font-bold">Email Us</h4>
                <p className="font-body text-muted-foreground text-sm">hello@juiceflow.com</p>
              </div>
            </div>
            <div className="juice-card p-6 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl gradient-bg-purple flex items-center justify-center shrink-0">
                <MapPin className="text-primary-foreground" size={22} />
              </div>
              <div>
                <h4 className="font-display font-bold">Visit Us</h4>
                <p className="font-body text-muted-foreground text-sm">123 Fresh Ave, Suite 100<br />San Diego, CA 92101</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 juice-card p-8 space-y-5 contact-el">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-display text-sm font-semibold mb-1.5 block">Name</label>
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-display text-sm font-semibold mb-1.5 block">Email</label>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div>
              <label className="font-display text-sm font-semibold mb-1.5 block">Phone</label>
              <input
                type="tel" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="font-display text-sm font-semibold mb-1.5 block">Message</label>
              <textarea
                required rows={4} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                placeholder="Tell us about your juice bar..."
              />
            </div>
            <button type="submit" className="w-full gradient-bg-hero rounded-xl px-8 py-3.5 font-display font-bold text-primary-foreground shadow-glow-green transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
