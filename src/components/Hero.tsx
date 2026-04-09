import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Heart, Stethoscope, Users } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden min-h-[calc(100vh-64px)] flex items-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-brand-teal/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-xs font-bold text-brand-teal mb-6"
            >
              <ShieldCheck size={14} />
              Trusted by 12,000+ Pet Parents
            </motion.span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1] tracking-tight">
              Your pet's health,{' '}
              <span className="text-gradient">all in one place.</span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-white/50 mb-8 leading-relaxed">
              Secure health records, vaccination timelines, a verified marketplace, and a
              community of pet lovers — WigglyWoosh is the digital vault your pet deserves.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onStart}
                className="w-full sm:w-auto bg-brand-teal text-brand-dark px-7 py-3.5 rounded-2xl font-bold text-base hover:bg-brand-teal-dark hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white/5 border border-white/10 px-7 py-3.5 rounded-2xl font-bold text-base hover:bg-white/10 transition-colors">
                For Veterinarians
              </button>
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-teal/5">
              <img
                src="/images/hero-dashboard.png"
                alt="WigglyWoosh Pet Health Dashboard"
                className="w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
            </div>

            {/* Floating Card: Active Pets */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 -left-4 z-20 hidden md:block p-4 glass-strong rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <Heart className="text-pink-400" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Active Pets</p>
                  <p className="text-xl font-display font-bold"><AnimatedCounter target={12450} suffix="+" /></p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card: Verified Vets */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 z-20 hidden md:block p-4 glass-strong rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-teal/20 rounded-xl flex items-center justify-center">
                  <Stethoscope className="text-brand-teal" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Verified Vets</p>
                  <p className="text-xl font-display font-bold"><AnimatedCounter target={850} suffix="+" /></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
        >
          {[
            { icon: Heart, label: 'Happy Pet Parents', value: 12000, suffix: '+', color: 'text-pink-400 bg-pink-500/10' },
            { icon: Stethoscope, label: 'Verified Vets', value: 850, suffix: '+', color: 'text-brand-teal bg-brand-teal/10' },
            { icon: ShieldCheck, label: 'Health Records', value: 54000, suffix: '+', color: 'text-blue-400 bg-blue-500/10' },
            { icon: Users, label: 'Community Posts', value: 8200, suffix: '+', color: 'text-purple-400 bg-purple-500/10' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 sm:p-6 text-center hover:bg-white/[0.07] transition-colors">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <stat.icon size={20} />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-bold">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-white/40 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
