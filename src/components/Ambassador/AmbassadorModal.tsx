import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, ShieldCheck, User, Mail, Phone, School, MapPin } from 'lucide-react';

interface AmbassadorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AmbassadorModal: React.FC<AmbassadorModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    city: '',
    year: '2nd Year',
    motivation: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#060914] border border-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.25)] rounded-lg p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-black/40 border border-gold/20 hover:border-gold transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-2xl font-display font-black text-white uppercase">
              Application Received!
            </h3>
            <p className="text-sm text-slate-300 font-sans max-w-md mx-auto">
              Thank you for applying to be a Campus Ambassador for RoboVeda’26! Our central student outreach team will review your profile and connect via WhatsApp/Email within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-gold font-bold">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>ROBOVEDA’26 // CAMPUS AMBASSADOR INITIATIVE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                Represent Your <span className="text-gold-gradient">Campus</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans">
                Lead the robotics delegation from your university, earn free workshop passes, official certificates of merit, and exclusive festival merchandise.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gold" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-black/60 border border-gold/25 p-2.5 rounded text-white placeholder:text-slate-600 focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gold" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@college.edu.in"
                    className="w-full bg-black/60 border border-gold/25 p-2.5 rounded text-white placeholder:text-slate-600 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gold" /> WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-black/60 border border-gold/25 p-2.5 rounded text-white placeholder:text-slate-600 focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-gold" /> College / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. NIT Warangal / IIT Madras"
                    className="w-full bg-black/60 border border-gold/25 p-2.5 rounded text-white placeholder:text-slate-600 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" /> City & State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Hyderabad, Telangana"
                    className="w-full bg-black/60 border border-gold/25 p-2.5 rounded text-white placeholder:text-slate-600 focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono">Current Academic Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-black/60 border border-gold/25 p-2.5 rounded text-white focus:outline-none focus:border-gold"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year / Final Year</option>
                    <option>Postgraduate / Researcher</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-mono">Why do you want to be a Campus Ambassador?</label>
                <textarea
                  rows={2}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Tell us briefly about your college robotics club or how you plan to lead student participation..."
                  className="w-full bg-black/60 border border-gold/25 p-2.5 rounded text-white placeholder:text-slate-600 focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-display font-black text-xs uppercase tracking-wider transition-all duration-300 rounded flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT AMBASSADOR APPLICATION</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
