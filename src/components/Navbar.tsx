import { motion } from 'motion/react';
import { PawPrint, Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Health Vault', id: 'health' },
    { name: 'Marketplace', id: 'marketplace' },
    { name: 'Community', id: 'community' },
    { name: 'Find a Vet', id: 'vets' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center">
              <PawPrint className="text-brand-dark" size={24} />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">WigglyWoosh</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors hover:text-brand-teal ${
                  currentPage === item.id ? 'text-brand-teal' : 'text-white/70'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Search size={20} className="text-white/70" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <User size={20} className="text-white/70" />
            </button>
            <button className="bg-brand-teal text-brand-dark px-4 py-2 rounded-full text-sm font-bold hover:bg-brand-teal/90 transition-colors">
              Join Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white/70">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-white/5 px-4 pt-2 pb-6 space-y-1"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-4 text-base font-medium rounded-lg ${
                currentPage === item.id ? 'bg-brand-teal/10 text-brand-teal' : 'text-white/70 hover:bg-white/5'
              }`}
            >
              {item.name}
            </button>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full bg-brand-teal text-brand-dark px-4 py-3 rounded-xl font-bold">
              Join Us
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
