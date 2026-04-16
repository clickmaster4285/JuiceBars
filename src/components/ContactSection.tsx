import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Phone, Mail, MapPin, Clock, Navigation, MessageSquare } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

// Location data
const LOCATION = {
  fullAddress:
    "Paris Shopping Mall, 4th floor, Main PWD Rd, PWD Housing Society Sector A, Islamabad, Punjab 45700, Pakistan",
};

const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  LOCATION.fullAddress
)}&output=embed`;

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-el", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Button animation
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 });
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          phone: form.phone,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again or email marketing@clickmasters.pk");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="contact-el inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-display text-sm font-semibold">
            Contact Us
          </span>
          <h2 className="contact-el font-display text-3xl md:text-5xl font-bold mt-6 mb-4">
            Ready to <span className="text-gradient-primary">Get Started?</span>
          </h2>
          <p className="contact-el font-body text-muted-foreground max-w-xl mx-auto text-lg">
            Drop us a line and we'll set up a free demo for your ice cream shop.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto items-start">
          {/* Left side - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            <div className="contact-el bg-card rounded-2xl p-6 flex gap-4 items-start border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground">Visit Us</h4>
                <p className="font-body text-muted-foreground text-sm">{LOCATION.fullAddress}</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-el bg-card rounded-2xl p-6 flex gap-4 items-start border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground">Email Us</h4>
                <p className="font-body text-muted-foreground text-sm">marketing@clickmasters.pk</p>
                <p className="font-body text-muted-foreground text-sm">info@clickmasters.pk</p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-el bg-card rounded-2xl p-6 flex gap-4 items-start border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground">Call Us</h4>
                <p className="font-body text-muted-foreground text-sm">+92 333-1116842</p>
                <p className="font-body text-muted-foreground text-sm">+92 332-5394285</p>
              </div>
            </div>

            {/* Hours */}
            <div className="contact-el bg-card rounded-2xl p-6 flex gap-4 items-start border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground">Business Hours</h4>
                <p className="font-body text-muted-foreground text-sm">Monday - Saturday: 9AM - 6PM</p>
                <p className="font-body text-muted-foreground text-sm">Sunday: Closed</p>
              </div>
            </div>

            {/* Map */}
            <div className="contact-el rounded-xl overflow-hidden border border-border h-48">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Location"
                className="w-full h-full"
              />
            </div>

            {/* Directions Link */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                LOCATION.fullAddress
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-el inline-flex items-center gap-2 text-primary text-sm hover:underline"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-xl border border-border space-y-5 contact-el">
              <div className="flex gap-2 items-center mb-4 pb-3 border-b border-border">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground text-lg">Send us a message</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-display text-sm font-semibold mb-1.5 block text-foreground">Full Name *</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-display text-sm font-semibold mb-1.5 block text-foreground">Email Address *</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="font-display text-sm font-semibold mb-1.5 block text-foreground">
                  Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
                </label>
                <input
                  type="tel" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="+92 XXX XXXXXXX"
                />
              </div>

              <div>
                <label className="font-display text-sm font-semibold mb-1.5 block text-foreground">Your Message *</label>
                <textarea
                  required rows={4} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none text-foreground placeholder:text-muted-foreground"
                  placeholder="Tell us about your ice cream shop and requirements..."
                />
              </div>

              <button
                ref={btnRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground rounded-xl px-8 py-3.5 font-display font-bold transition-all hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;