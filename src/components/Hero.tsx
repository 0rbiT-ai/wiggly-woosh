import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-teal/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-teal mb-6">
            <ShieldCheck size={14} />
            Central Intelligence for Your Pet's Care
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[1.1] tracking-tight">
            One platform to manage <br />
            <span className="text-gradient">everything about your pet.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
            From secure health records and vaccination timelines to a verified marketplace and community support. WigglyWoosh is your pet's digital vault.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="w-full sm:w-auto bg-brand-teal text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 group"
            >
              Launch Your Pet's Vault
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white/5 border border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
              For Vets and Groomers
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-teal/10">
            <img
              src="https://picsum.photos/seed/wigglywoosh-petcare/1200/600"
              alt="Pet Care Dashboard"
              className="w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
          </div>

          {/* Floating Stats */}
          <div className="absolute -top-6 -left-6 z-20 hidden lg:block p-6 glass rounded-2xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                <Heart className="text-pink-500" size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/50 uppercase font-bold tracking-wider">Active Pets</p>
                <p className="text-2xl font-display font-bold">12,450+</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 z-20 hidden lg:block p-6 glass rounded-2xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-teal/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="text-brand-teal" size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/50 uppercase font-bold tracking-wider">Verified Vets</p>
                <p className="text-2xl font-display font-bold">850+</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
