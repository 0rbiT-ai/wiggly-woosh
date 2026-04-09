import { motion } from 'motion/react';
import { MapPin, Star, ShieldCheck, Phone, Calendar, Search } from 'lucide-react';
import { MOCK_VETS } from '../constants';

export default function VetSearch() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Find a Vet</h2>
            <p className="text-lg text-white/60">Every provider is physically audited for hygiene, safety, and quality.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-teal" size={18} />
              <input
                type="text"
                placeholder="Enter your location..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-teal transition-colors"
              />
            </div>
            <button className="bg-brand-teal text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-teal/90 transition-colors">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="h-[600px] glass rounded-[40px] overflow-hidden relative border border-white/10">
            <img
              src="https://picsum.photos/seed/map/800/800"
              alt="Map View"
              className="w-full h-full object-cover opacity-50 grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
            
            {/* Mock Map Markers */}
            <div className="absolute top-1/4 left-1/3 w-10 h-10 bg-brand-teal rounded-full border-4 border-brand-dark flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.5)] animate-bounce">
              <MapPin size={20} className="text-brand-dark" />
            </div>
            <div className="absolute top-1/2 left-2/3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/20 flex items-center justify-center">
              <MapPin size={16} className="text-white" />
            </div>
          </div>

          {/* Vet List */}
          <div className="space-y-6 overflow-y-auto max-h-[600px] pr-4 custom-scrollbar">
            {MOCK_VETS.map((vet, index) => (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={vet.id}
                className="glass p-6 rounded-3xl border border-white/5 hover:border-brand-teal/30 transition-all group"
              >
                <div className="flex gap-6">
                  <img
                    src={vet.image}
                    alt={vet.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{vet.name}</h3>
                          {vet.verified && (
                            <div className="text-brand-teal" title="Verified Provider">
                              <ShieldCheck size={18} />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-white/50">{vet.specialty} • {vet.distance}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold">{vet.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <button className="flex-1 bg-brand-teal/10 text-brand-teal py-2 rounded-xl text-sm font-bold hover:bg-brand-teal hover:text-brand-dark transition-all flex items-center justify-center gap-2">
                        <Calendar size={16} />
                        Book Appointment
                      </button>
                      <button className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Phone size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Partner CTA */}
            <div className="p-8 rounded-3xl border border-dashed border-white/20 flex flex-col items-center text-center gap-4">
              <h4 className="font-bold">Are you a Vet or Groomer?</h4>
              <p className="text-sm text-white/50">Join our network of verified providers and grow your practice.</p>
              <button className="text-brand-teal font-bold text-sm underline underline-offset-4">
                Apply for Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
