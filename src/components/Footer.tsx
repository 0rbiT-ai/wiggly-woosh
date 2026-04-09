import { PawPrint, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center">
                <PawPrint className="text-brand-dark" size={24} />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">WigglyWoosh</span>
            </div>
            <p className="text-white/50 leading-relaxed">
              Central Intelligence Hub for Pet Care. We provide a secure vault for your pet's health records and a verified marketplace for all their needs.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-brand-teal transition-colors">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-white/50">
              <li><button className="hover:text-brand-teal transition-colors">Health Vault</button></li>
              <li><button className="hover:text-brand-teal transition-colors">Marketplace</button></li>
              <li><button className="hover:text-brand-teal transition-colors">Community Forum</button></li>
              <li><button className="hover:text-brand-teal transition-colors">Find a Vet</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-white/50">
              <li><button className="hover:text-brand-teal transition-colors">About Us</button></li>
              <li><button className="hover:text-brand-teal transition-colors">Careers</button></li>
              <li><button className="hover:text-brand-teal transition-colors">Partner Program</button></li>
              <li><button className="hover:text-brand-teal transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-white/50 mb-4">Get pet care tips and exclusive marketplace offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-brand-teal transition-colors"
              />
              <button className="bg-brand-teal text-brand-dark px-4 py-2 rounded-xl font-bold text-sm">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-bold uppercase tracking-widest">
          <p>© 2026 WigglyWoosh. All rights reserved.</p>
          <div className="flex gap-8">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
