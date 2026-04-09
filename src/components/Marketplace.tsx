import { motion } from 'motion/react';
import { ShoppingCart, Star, Filter, Search } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

export default function Marketplace() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Marketplace</h2>
            <p className="text-lg text-white/60">Premium food, accessories, and health products vetted for quality.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-teal transition-colors"
              />
            </div>
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={product.id}
              className="glass rounded-3xl overflow-hidden group border border-white/5 hover:border-brand-teal/30 transition-all"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold">{product.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-2">{product.category}</p>
                <h3 className="text-lg font-bold mb-4 line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-bold">${product.price}</span>
                  <button className="p-3 bg-brand-teal text-brand-dark rounded-xl hover:scale-110 transition-transform">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-12 glass rounded-[40px] bg-gradient-to-r from-brand-teal/10 to-blue-600/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-3xl font-display font-bold mb-4">Subscribe & Save 15%</h3>
            <p className="text-white/60">Never run out of your pet's favorites. Set up recurring deliveries and get exclusive discounts.</p>
          </div>
          <button className="bg-white text-brand-dark px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
