import { motion } from 'motion/react';
import { FileText, Calendar, Shield, Plus, ChevronRight, Syringe, FlaskConical, Pill, Stethoscope, Trash2, Filter, Sparkles } from 'lucide-react';
import { MOCK_HEALTH_RECORDS } from '../constants';
import { HealthRecord } from '../types';
import { useState, useEffect, type ReactNode, type FormEvent } from 'react';
import Modal from './Modal';
import { useToast } from '../App';

const typeIcons: Record<string, ReactNode> = {
  Vaccination: <Syringe size={22} />,
  'Lab Report': <FlaskConical size={22} />,
  Prescription: <Pill size={22} />,
  Checkup: <Stethoscope size={22} />,
};

const typeColors: Record<string, string> = {
  Vaccination: 'bg-blue-500/20 text-blue-400',
  'Lab Report': 'bg-purple-500/20 text-purple-400',
  Prescription: 'bg-amber-500/20 text-amber-400',
  Checkup: 'bg-brand-teal/20 text-brand-teal',
};

const statusColors: Record<string, string> = {
  Completed: 'bg-green-500/20 text-green-400',
  Scheduled: 'bg-blue-500/20 text-blue-400',
  Due: 'bg-amber-500/20 text-amber-400',
  Missed: 'bg-red-500/20 text-red-400',
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function HealthVault() {
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const [records, setRecords] = useState<HealthRecord[]>(() => {
    try {
      const saved = localStorage.getItem('wigglywoosh-health-records');
      return saved ? JSON.parse(saved) : MOCK_HEALTH_RECORDS;
    } catch {
      return MOCK_HEALTH_RECORDS;
    }
  });

  useEffect(() => {
    localStorage.setItem('wigglywoosh-health-records', JSON.stringify(records));
  }, [records]);

  const [form, setForm] = useState({
    petName: '',
    type: 'Vaccination' as HealthRecord['type'],
    title: '',
    date: '',
    description: '',
    status: 'Scheduled' as HealthRecord['status'],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.petName || !form.title || !form.date) return;

    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      ...form,
    };
    setRecords(prev => [newRecord, ...prev]);
    setForm({ petName: '', type: 'Vaccination', title: '', date: '', description: '', status: 'Scheduled' });
    setModalOpen(false);
    addToast('success', 'Record Added', `${form.title} for ${form.petName} has been saved.`);
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    addToast('info', 'Record Deleted');
  };

  const filteredRecords = filter === 'All'
    ? records
    : records.filter(r => r.type === filter);

  const upcomingVaccinations = records
    .filter(r => r.type === 'Vaccination' && r.status !== 'Completed')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const completedVaccinations = records
    .filter(r => r.type === 'Vaccination' && r.status === 'Completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return (
    <section className="py-16 sm:py-24 bg-brand-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">Health Vault</h2>
            <p className="text-base sm:text-lg text-white/50">
              Your pet's complete medical history — organised, encrypted, and always accessible.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto bg-brand-teal text-brand-dark px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-teal-dark transition-colors active:scale-[0.98]"
          >
            <Plus size={18} />
            Add Record
          </button>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Filter size={16} className="text-white/30 shrink-0" />
          {['All', 'Vaccination', 'Lab Report', 'Prescription', 'Checkup'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === type
                  ? 'bg-brand-teal text-brand-dark'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline View */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-display font-bold">
                {filter === 'All' ? 'All Records' : filter} ({filteredRecords.length})
              </h3>
            </div>

            {filteredRecords.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <FileText size={48} className="text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-medium">No records found</p>
                <p className="text-white/20 text-sm mt-1">Add your first health record to get started.</p>
              </div>
            ) : (
              filteredRecords.map((record, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  key={record.id}
                  className="glass p-4 sm:p-5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${typeColors[record.type]}`}>
                      {typeIcons[record.type]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{record.type}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusColors[record.status]}`}>
                          {record.status}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold truncate">{record.title}</h4>
                      <p className="text-xs text-white/30 truncate">
                        {record.petName} • {formatDate(record.date)} {record.description && `• ${record.description}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <button
                      onClick={() => deleteRecord(record.id)}
                      className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all text-white/20"
                      aria-label="Delete record"
                    >
                      <Trash2 size={16} />
                    </button>
                    <ChevronRight className="text-white/10 group-hover:text-white/30 transition-colors hidden sm:block" size={18} />
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vaccination Timeline */}
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center gap-2.5 mb-5">
                <Syringe className="text-brand-teal" size={20} />
                <h3 className="text-base font-display font-bold">Vaccination Timeline</h3>
              </div>
              <div className="relative pl-7 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {completedVaccinations.map((v) => (
                  <div key={v.id} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-0.5">Completed</p>
                    <p className="font-bold text-sm">{v.title}</p>
                    <p className="text-xs text-white/30">{v.petName} • {formatDate(v.date)}</p>
                  </div>
                ))}
                {upcomingVaccinations.map((v) => (
                  <div key={v.id} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-brand-teal animate-pulse" />
                    <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-0.5">Upcoming</p>
                    <p className="font-bold text-sm">{v.title}</p>
                    <p className="text-xs text-white/30">{v.petName} • {formatDate(v.date)}</p>
                  </div>
                ))}
                {completedVaccinations.length === 0 && upcomingVaccinations.length === 0 && (
                  <p className="text-sm text-white/30">No vaccination records yet.</p>
                )}
              </div>
            </div>

            {/* Smart Diagnosis Card */}
            <div className="glass p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
              <Sparkles className="text-purple-400 mb-3" size={28} />
              <h3 className="text-base font-display font-bold mb-2">Smart Symptom Checker</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                Not feeling well? Describe your pet's symptoms and our AI assistant will help you decide if a vet visit is needed.
              </p>
              <button className="w-full py-2.5 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs hover:bg-purple-500/30 transition-all border border-purple-500/30">
                Start Diagnosis
              </button>
            </div>

            {/* Security Card */}
            <div className="glass p-6 rounded-2xl bg-gradient-to-br from-brand-teal/5 to-transparent border-brand-teal/10">
              <Shield className="text-brand-teal mb-3" size={28} />
              <h3 className="text-base font-display font-bold mb-2">Secure & Private</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Your pet's medical data is encrypted with bank-level security. Data is never shared without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Record Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Health Record">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/50 mb-1.5">Pet Name *</label>
              <input
                type="text"
                required
                value={form.petName}
                onChange={(e) => setForm(f => ({ ...f, petName: e.target.value }))}
                placeholder="e.g. Buddy"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/50 mb-1.5">Record Type *</label>
              <select
                value={form.type}
                onChange={(e) => setForm(f => ({ ...f, type: e.target.value as HealthRecord['type'] }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors appearance-none"
              >
                <option value="Vaccination">Vaccination</option>
                <option value="Lab Report">Lab Report</option>
                <option value="Prescription">Prescription</option>
                <option value="Checkup">Checkup</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/50 mb-1.5">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Rabies Booster Shot"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/50 mb-1.5">Date *</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/50 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm(f => ({ ...f, status: e.target.value as HealthRecord['status'] }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors appearance-none"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Due">Due</option>
                <option value="Missed">Missed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/50 mb-1.5">Notes</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Any additional notes..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-brand-teal text-brand-dark font-bold hover:bg-brand-teal-dark transition-colors">
              Save Record
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
