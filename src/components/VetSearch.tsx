import { motion } from 'motion/react';
import { MapPin, Star, ShieldCheck, Phone, Calendar, Search, Clock, Stethoscope, CheckCircle } from 'lucide-react';
import { MOCK_VETS } from '../constants';
import { useState, type FormEvent } from 'react';
import Modal from './Modal';
import { useToast } from '../App';

export default function VetSearch() {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [bookingModal, setBookingModal] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    petName: '',
    date: '',
    time: '',
    notes: '',
  });
  const [booked, setBooked] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('wigglywoosh-bookings');
      return new Set(saved ? JSON.parse(saved) : []);
    } catch {
      return new Set();
    }
  });

  const filteredVets = MOCK_VETS.filter(vet =>
    vet.name.toLowerCase().includes(search.toLowerCase()) ||
    vet.specialty.toLowerCase().includes(search.toLowerCase()) ||
    vet.services.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedVet = MOCK_VETS.find(v => v.id === bookingModal);

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingForm.petName || !bookingForm.date || !bookingForm.time) return;

    const newBooked = new Set(booked);
    newBooked.add(bookingModal!);
    setBooked(newBooked);
    localStorage.setItem('wigglywoosh-bookings', JSON.stringify([...newBooked]));

    addToast('success', 'Appointment Booked! 🎉', `${selectedVet?.name} on ${bookingForm.date} at ${bookingForm.time}`);
    setBookingModal(null);
    setBookingForm({ petName: '', date: '', time: '', notes: '' });
  };

  const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Find a Vet</h2>
            <p className="text-base sm:text-lg text-white/50">Every provider is audited for hygiene, safety, and quality of care.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-teal" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, specialty..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-teal transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Map */}
          <div className="h-[350px] sm:h-[450px] lg:h-[600px] glass rounded-3xl overflow-hidden relative border border-white/10">
            <div className="absolute inset-0 bg-brand-gray/80">
              {/* Stylized map grid */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(12)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-white/10" style={{ top: `${(i + 1) * 8}%` }} />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-white/10" style={{ left: `${(i + 1) * 12}%` }} />
                ))}
              </div>
              {/* Road lines */}
              <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-white/5 rounded-full" />
              <div className="absolute left-0 right-0 top-2/5 h-1 bg-white/5 rounded-full" />
              <div className="absolute top-0 bottom-0 left-2/3 w-0.5 bg-white/[0.03] rounded-full" />
              <div className="absolute left-0 right-0 top-3/4 h-0.5 bg-white/[0.03] rounded-full" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />

            {/* Map Pins */}
            {filteredVets.map((vet, i) => {
              const positions = [
                { top: '25%', left: '30%' },
                { top: '55%', left: '65%' },
                { top: '40%', left: '50%' },
                { top: '70%', left: '25%' },
              ];
              const pos = positions[i % positions.length];
              return (
                <motion.div
                  key={vet.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
                  className={`absolute z-10 ${vet.verified ? 'animate-pulse-glow' : ''}`}
                  style={pos}
                >
                  <div className={`w-10 h-10 ${vet.verified ? 'bg-brand-teal' : 'bg-white/20'} rounded-full border-3 border-brand-dark flex items-center justify-center shadow-xl cursor-pointer hover:scale-125 transition-transform`}>
                    <MapPin size={18} className={vet.verified ? 'text-brand-dark' : 'text-white'} />
                  </div>
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-brand-dark/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border border-white/10 hidden sm:block">
                    {vet.name.split(' ').slice(0, 2).join(' ')}
                  </div>
                </motion.div>
              );
            })}

            {/* Your Location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-3 border-white shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
              <div className="absolute -inset-3 bg-blue-500/20 rounded-full animate-ping" />
            </div>
          </div>

          {/* Vet List */}
          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">
            {filteredVets.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <Search size={48} className="text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-medium">No vets found</p>
                <p className="text-white/20 text-sm mt-1">Try a different search term.</p>
              </div>
            ) : (
              filteredVets.map((vet, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: Math.min(index * 0.08, 0.3) }}
                  key={vet.id}
                  className="glass p-5 rounded-2xl border border-white/5 hover:border-brand-teal/20 transition-all"
                >
                  <div className="flex gap-4 sm:gap-5">
                    <img
                      src={vet.image}
                      alt={vet.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <h3 className="text-base sm:text-lg font-bold truncate">{vet.name}</h3>
                            {vet.verified && (
                              <ShieldCheck size={16} className="text-brand-teal shrink-0" />
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-white/40">{vet.specialty}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg shrink-0">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-bold">{vet.rating}</span>
                          <span className="text-[10px] text-white/30">({vet.reviewCount})</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-white/30">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {vet.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {vet.hours}
                        </span>
                      </div>

                      {/* Services */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {vet.services.slice(0, 3).map(s => (
                          <span key={s} className="px-2 py-0.5 bg-white/5 rounded-md text-[10px] text-white/40 font-medium">{s}</span>
                        ))}
                        {vet.services.length > 3 && (
                          <span className="px-2 py-0.5 text-[10px] text-white/30">+{vet.services.length - 3} more</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => setBookingModal(vet.id)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            booked.has(vet.id)
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : 'bg-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-brand-dark'
                          }`}
                        >
                          {booked.has(vet.id) ? (
                            <><CheckCircle size={16} /> Booked</>
                          ) : (
                            <><Calendar size={16} /> Book Appt.</>
                          )}
                        </button>
                        <a
                          href={`tel:${vet.phone}`}
                          className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                          aria-label={`Call ${vet.name}`}
                        >
                          <Phone size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {/* Partner CTA */}
            <div className="p-6 sm:p-8 rounded-2xl border border-dashed border-white/10 text-center space-y-3">
              <Stethoscope size={28} className="text-white/15 mx-auto" />
              <h4 className="font-bold text-sm">Are you a Vet or Groomer?</h4>
              <p className="text-xs text-white/30">Join our network of verified providers and grow your practice.</p>
              <button className="text-brand-teal font-bold text-sm underline underline-offset-4 hover:text-brand-teal-dark transition-colors">
                Apply for Verification
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={!!bookingModal}
        onClose={() => { setBookingModal(null); setBookingForm({ petName: '', date: '', time: '', notes: '' }); }}
        title={`Book Appointment — ${selectedVet?.name ?? ''}`}
      >
        <form onSubmit={handleBooking} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/50 mb-1.5">Pet Name *</label>
            <input
              type="text"
              required
              value={bookingForm.petName}
              onChange={(e) => setBookingForm(f => ({ ...f, petName: e.target.value }))}
              placeholder="e.g. Buddy"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/50 mb-1.5">Preferred Date *</label>
            <input
              type="date"
              required
              value={bookingForm.date}
              onChange={(e) => setBookingForm(f => ({ ...f, date: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/50 mb-2">Time Slot *</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setBookingForm(f => ({ ...f, time: slot }))}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                    bookingForm.time === slot
                      ? 'bg-brand-teal text-brand-dark'
                      : 'bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/50 mb-1.5">Notes (optional)</label>
            <textarea
              value={bookingForm.notes}
              onChange={(e) => setBookingForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Any symptoms, concerns, or special requirements..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setBookingModal(null)} className="flex-1 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!bookingForm.petName || !bookingForm.date || !bookingForm.time}
              className="flex-1 py-3 rounded-xl bg-brand-teal text-brand-dark font-bold hover:bg-brand-teal-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              Confirm Booking
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
