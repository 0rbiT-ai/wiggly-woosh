import { PawPrint, Instagram, Twitter, Facebook, Mail, Heart, ArrowRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useToast } from '../App';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      addToast('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    addToast('success', 'Subscribed! 🎉', 'You\'ll receive pet care tips and exclusive offers.');
    setEmail('');
  };

  const platformLinks = [
    { name: 'Health Vault', id: 'health' },
    { name: 'Marketplace', id: 'marketplace' },
    { name: 'Community Forum', id: 'community' },
    { name: 'Find a Vet', id: 'vets' },
  ];

  const companyLinks = ['About Us', 'Careers', 'Partner Program', 'Press Kit', 'Contact'];

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-16 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-teal rounded-xl flex items-center justify-center">
                <PawPrint className="text-brand-dark" size={20} />
              </div>
              <span className="text-lg font-display font-bold tracking-tight">
                Wiggly<span className="text-brand-teal">Woosh</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              The complete digital platform for modern pet parents. Secure health records, verified vets, premium products, and a caring community.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Mail, label: 'Email' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-brand-teal/10 hover:text-brand-teal hover:border-brand-teal/20 transition-all"
                  aria-label={label}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-sm mb-5">Platform</h4>
            <ul className="space-y-3">
              {platformLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-sm text-white/40 hover:text-brand-teal transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-sm mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link}>
                  <button className="text-sm text-white/40 hover:text-brand-teal transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-sm mb-5">Stay Updated</h4>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">Get pet care tips and exclusive marketplace offers delivered to your inbox.</p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <Heart size={16} className="text-green-400 fill-green-400 shrink-0" />
                <p className="text-sm text-green-400 font-medium">Thanks for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-teal transition-colors min-w-0"
                />
                <button
                  type="submit"
                  className="bg-brand-teal text-brand-dark p-2.5 rounded-xl font-bold hover:bg-brand-teal-dark transition-colors shrink-0"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20 font-medium">© 2026 WigglyWoosh. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-white/20 font-medium">
            <button className="hover:text-white/50 transition-colors">Privacy Policy</button>
            <button className="hover:text-white/50 transition-colors">Terms of Service</button>
            <button className="hover:text-white/50 transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
