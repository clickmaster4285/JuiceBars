import { Citrus, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-display text-2xl font-bold mb-4">
              <Citrus size={28} className="text-juice-green" />
              <span>JuiceFlow</span>
            </div>
            <p className="font-body text-sm opacity-70 leading-relaxed mb-6">
              Modern POS solutions built specifically for juice bars, smoothie shops, and health-focused beverage businesses.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm opacity-70">
              {["About", "Features", "Services", "How It Works"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="hover:text-juice-green transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Resources</h4>
            <ul className="space-y-2 font-body text-sm opacity-70">
              {["Blog", "Case Studies", "Testimonials", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="hover:text-juice-green transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <ul className="space-y-2 font-body text-sm opacity-70">
              <li>+1 (555) 234-5678</li>
              <li>hello@juiceflow.com</li>
              <li>123 Fresh Ave, Suite 100</li>
              <li>San Diego, CA 92101</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="font-body text-sm opacity-50">© 2026 JuiceFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
