import { motion } from 'motion/react';
import { FileText, Calendar, Shield, Plus, ChevronRight } from 'lucide-react';
import { MOCK_HEALTH_RECORDS } from '../constants';

export default function HealthVault() {
  return (
    <section className="py-24 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Health Vault</h2>
            <p className="text-lg text-white/60">
              Photograph records once — WigglyWoosh organises everything automatically in your pet's secure digital vault. Encrypted and accessible only to you.
            </p>
          </div>
          <button className="bg-brand-teal text-brand-dark px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
            <Plus size={20} />
            Add New Record
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline View */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-display font-bold">Recent Activity</h3>
              <button className="text-brand-teal text-sm font-bold flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            {MOCK_HEALTH_RECORDS.map((record, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={record.id}
                className="glass p-6 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    record.type === 'Vaccination' ? 'bg-blue-500/20 text-blue-400' :
                    record.type === 'Lab Report' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-brand-teal/20 text-brand-teal'
                  }`}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest opacity-50">{record.type}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        record.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                        record.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold">{record.title}</h4>
                    <p className="text-sm text-white/40">{record.date} • {record.description}</p>
                  </div>
                </div>
                <ChevronRight className="text-white/20 group-hover:text-brand-teal transition-colors" />
              </motion.div>
            ))}
          </div>

          {/* Quick Stats / Vaccination Timeline */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-brand-teal" size={24} />
                <h3 className="text-xl font-display font-bold">Vaccination Timeline</h3>
              </div>
              <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <p className="text-sm font-bold text-white/40 mb-1">COMPLETED</p>
                  <p className="font-bold">Rabies Booster</p>
                  <p className="text-xs text-white/40">Jul 26, 2025</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-brand-teal animate-pulse" />
                  <p className="text-sm font-bold text-brand-teal mb-1">UPCOMING</p>
                  <p className="font-bold">DHPP Core</p>
                  <p className="text-xs text-white/40">Aug 8, 2025</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-white/20" />
                  <p className="text-sm font-bold text-white/40 mb-1">NEXT YEAR</p>
                  <p className="font-bold">Bordetella</p>
                  <p className="text-xs text-white/40">Scheduled for 2026</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-brand-teal/10 to-transparent border border-brand-teal/20">
              <Shield className="text-brand-teal mb-4" size={32} />
              <h3 className="text-xl font-display font-bold mb-2">Secure & Private</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Your pet's medical data is encrypted in transit and at rest using bank-level security. Data is never shared without explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
