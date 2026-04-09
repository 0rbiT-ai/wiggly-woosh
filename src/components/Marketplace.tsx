import { motion } from 'motion/react';
import { ShoppingCart, Star, Search, Tag, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useState } from 'react';
import { useCart } from '../App';

type Category = 'All' | 'Food' | 'Accessories' | 'Health' | 'Grooming';

export default function Marketplace() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');

  const categories: { name: Category; count: number }[] = [
    { name: 'All', count: MOCK_PRODUCTS.length },
    { name: 'Food', count: MOCK_PRODUCTS.filter(p => p.category === 'Food').length },
    { name: 'Accessories', count: MOCK_PRODUCTS.filter(p => p.category === 'Accessories').length },
    { name: 'Health', count: MOCK_PRODUCTS.filter(p => p.category === 'Health').length },
    { name: 'Grooming', count: MOCK_PRODUCTS.filter(p => p.category === 'Grooming').length },
  ];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const badgeColors: Record<string, string> = {
    'Best Seller': 'bg-amber-500/90 text-white',
    'New': 'bg-brand-teal/90 text-brand-dark',
    'Sale': 'bg-red-500/90 text-white',
    'Limited': 'bg-purple-500/90 text-white',
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Marketplace</h2>
            <p className="text-base sm:text-lg text-white/50">Premium products vetted by veterinarians for quality and safety.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-teal transition-colors text-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                category === cat.name
                  ? 'bg-brand-teal text-brand-dark'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {cat.name}
              <span className={`text-xs ${category === cat.name ? 'text-brand-dark/60' : 'text-white/30'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <Search size={48} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/40 font-medium">No products found</p>
            <p className="text-white/20 text-sm mt-1">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: Math.min(index * 0.05, 0.2) }}
                key={product.id}
                className="glass rounded-2xl overflow-hidden group border border-white/5 hover:border-brand-teal/20 transition-all"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Top badges row */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    {product.badge && (
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${badgeColors[product.badge]}`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="bg-brand-dark/70 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 ml-auto">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold">{product.rating}</span>
                      <span className="text-[10px] text-white/40">({product.reviewCount})</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={12} className="text-brand-teal" />
                    <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">{product.category}</p>
                  </div>
                  <h3 className="text-base font-bold mb-1.5 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-white/30 line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-display font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-white/30 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2.5 bg-brand-teal text-brand-dark rounded-xl hover:bg-brand-teal-dark hover:scale-110 transition-all active:scale-95"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Subscribe & Save Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 p-8 sm:p-12 glass rounded-3xl bg-gradient-to-r from-brand-teal/10 to-blue-600/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-start gap-4 max-w-xl text-center md:text-left">
            <Sparkles size={32} className="text-brand-teal shrink-0 hidden md:block mt-1" />
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3">Subscribe & Save 15%</h3>
              <p className="text-white/50 text-sm sm:text-base">Never run out of your pet's favorites. Set up recurring deliveries and enjoy exclusive discounts on every order.</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-white text-brand-dark px-8 py-3.5 rounded-2xl font-bold hover:scale-[1.02] transition-transform active:scale-[0.98] whitespace-nowrap">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
