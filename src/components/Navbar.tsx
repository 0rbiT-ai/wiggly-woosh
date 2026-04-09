import { motion, AnimatePresence } from 'motion/react';
import { PawPrint, Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onCartOpen: () => void;
  cartCount: number;
}

export default function Navbar({ onNavigate, currentPage, onCartOpen, cartCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Health Vault', id: 'health' },
    { name: 'Marketplace', id: 'marketplace' },
    { name: 'Community', id: 'community' },
    { name: 'Find a Vet', id: 'vets' },
  ];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('marketplace');
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => { onNavigate('home'); setIsOpen(false); }}
            >
              <div className="w-9 h-9 bg-brand-teal rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <PawPrint className="text-brand-dark" size={20} />
              </div>
              <span className="text-lg font-display font-bold tracking-tight">
                Wiggly<span className="text-brand-teal">Woosh</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    currentPage === item.id
                      ? 'text-brand-teal bg-brand-teal/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-[13px] left-3 right-3 h-0.5 bg-brand-teal rounded-full"
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 hover:bg-white/5 rounded-xl transition-colors"
                aria-label="Search"
              >
                <Search size={18} className="text-white/60" />
              </button>
              <button
                onClick={onCartOpen}
                className="relative p-2.5 hover:bg-white/5 rounded-xl transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={18} className="text-white/60" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-teal text-brand-dark text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button className="bg-brand-teal text-brand-dark px-5 py-2 rounded-xl text-sm font-bold hover:bg-brand-teal-dark transition-colors ml-1">
                Sign Up
              </button>
            </div>

            {/* Mobile: cart + menu */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={onCartOpen}
                className="relative p-2.5"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} className="text-white/70" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-teal text-brand-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-white/70"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 bg-brand-dark/95 backdrop-blur-xl">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3.5 text-base font-medium rounded-xl transition-all ${
                      currentPage === item.id
                        ? 'bg-brand-teal/10 text-brand-teal'
                        : 'text-white/60 hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-4 flex gap-3">
                  <button className="flex-1 bg-brand-teal text-brand-dark px-4 py-3.5 rounded-xl font-bold">
                    Sign Up
                  </button>
                  <button
                    onClick={() => { setSearchOpen(true); setIsOpen(false); }}
                    className="px-4 py-3.5 bg-white/5 rounded-xl border border-white/10"
                  >
                    <Search size={18} className="text-white/60" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-dark/95 backdrop-blur-xl flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl"
            >
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" size={22} />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, vets, posts..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-14 text-lg focus:outline-none focus:border-brand-teal transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} className="text-white/40" />
                </button>
              </form>
              <p className="text-center text-white/30 text-sm mt-4">Press Escape to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
