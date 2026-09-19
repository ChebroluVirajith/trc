import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Download,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Lock,
  User,
  Mail,
  Phone,
  GraduationCap,
  Users
} from 'lucide-react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { TICKETS_DATA } from '../../data/ticketsData';
import { TicketTier } from '../../types';
import {
  createRazorpayOrder,
  triggerRazorpayCheckout,
  CustomerDetails,
  PaymentVerificationResult
} from '../../utils/razorpay';

interface RegistrationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTierId?: string;
  eventName?: string;
}

export const RegistrationFormModal: React.FC<RegistrationFormModalProps> = ({
  isOpen,
  onClose,
  initialTierId = 'master-pass',
  eventName
}) => {
  // Selected Pass Tier
  const [selectedTierId, setSelectedTierId] = useState<string>(initialTierId);

  // Form State
  const [formData, setFormData] = useState<CustomerDetails>({
    name: '',
    email: '',
    phone: '',
    college: 'Sreenidhi Institute of Science and Technology (SNIST)',
    branch: 'CSE',
    year: '3rd Year',
    teamName: '',
    teamMembers: '',
    rollNumber: ''
  });

  // UI Flow State: 'form' | 'processing' | 'verifying' | 'success' | 'error'
  const [step, setStep] = useState<'form' | 'processing' | 'verifying' | 'success' | 'error'>('form');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeOrderId, setActiveOrderId] = useState<string>('');
  const [paymentResult, setPaymentResult] = useState<PaymentVerificationResult | null>(null);

  // Synchronize when initialTierId changes
  useEffect(() => {
    if (initialTierId) {
      setSelectedTierId(initialTierId);
    }
  }, [initialTierId]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step !== 'processing') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, step]);

  if (!isOpen) return null;

  const currentTier: TicketTier =
    TICKETS_DATA.find((t) => t.id === selectedTierId) || TICKETS_DATA[0];

  // Extract numerical amount from string like "₹1499"
  const amountNumeric = parseInt(currentTier.price.replace(/[^\d]/g, ''), 10) || 10;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentInitiation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form basic validations
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.college.trim()) {
      setErrorMessage('Please enter your college/institution name.');
      return;
    }

    setStep('processing');

    try {
      const passTitle = eventName
        ? `${currentTier.title} - ${eventName}`
        : currentTier.title;

      // Step 1: Create Razorpay order on backend
      const order = await createRazorpayOrder({
        amount: amountNumeric,
        passId: currentTier.id,
        passTitle,
        customer: formData
      });

      if (!order || !order.order_id) {
        throw new Error('Failed to generate Razorpay payment order.');
      }

      setActiveOrderId(order.order_id);

      // Step 2: Open Razorpay Standard Checkout Modal
      await triggerRazorpayCheckout({
        order,
        passTitle,
        customer: formData,
        onSuccess: (result) => {
          setPaymentResult(result);
          setStep('success');
        },
        onFailure: (error) => {
          console.error('Razorpay checkout failed/closed:', error);
          setErrorMessage(
            error?.message || 'Payment was cancelled or could not be completed. Please try again.'
          );
          setStep('form');
        }
      });
    } catch (err: any) {
      console.error('Error during registration checkout:', err);
      setErrorMessage(err?.message || 'An unexpected error occurred. Please try again.');
      setStep('form');
    }
  };

  const handlePrintPass = () => {
    window.print();
  };

  const isTeamPass =
    selectedTierId === 'single-event-pass' ||
    selectedTierId === 'pradarshan-combo' ||
    (eventName && !eventName.toLowerCase().includes('workshop'));

  return (
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-surface border border-gold/50 tech-corner-border shadow-[0_0_60px_rgba(212,175,55,0.25)] max-h-[92vh] flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gold/30 bg-surface-subtle">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TechnicalBadge code="RAZORPAY_GATEWAY" label="SECURE 256-BIT" variant="gold" />
              <span className="font-mono text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-cyan-400" /> INSTANT VERIFICATION
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
              ROBOVEDA'26 OFFICIAL REGISTRATION PORTAL
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-gold/40 text-gold-light hover:text-white hover:border-gold transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Switch */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* STEP: SUCCESS PASS DISPLAY */}
          {step === 'success' && (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
                  REGISTRATION CONFIRMED!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans">
                  Your payment has been successfully verified via Razorpay. Welcome to ROBOVEDA'26 ASCENSION!
                </p>
              </div>

              {/* Digital Verified Pass Card */}
              <div
                id="digital-pass"
                className="relative bg-gradient-to-br from-[#0d1624] to-[#12233b] border-2 border-gold p-6 sm:p-8 rounded-lg shadow-[0_0_40px_rgba(212,175,55,0.3)] space-y-6 print:border-black print:text-black"
              >
                {/* Hologram / Ribbon */}
                <div className="flex items-center justify-between border-b border-gold/30 pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-gold tracking-widest uppercase">
                      OFFICIAL DELEGATE PASS // ISO 20121:2012
                    </span>
                    <h4 className="text-2xl font-black font-display text-white tracking-wide">
                      ROBOVEDA'26
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-gold/20 border border-gold text-gold font-mono text-xs font-bold uppercase rounded">
                      VERIFIED PAID
                    </span>
                  </div>
                </div>

                {/* Candidate & Pass Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase text-[10px]">PASS HOLDER:</span>
                    <div className="text-base font-bold text-white uppercase">{formData.name}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase text-[10px]">PASS CATEGORY:</span>
                    <div className="text-sm font-bold text-gold-light uppercase">
                      {currentTier.title} {eventName ? `(${eventName})` : ''}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase text-[10px]">COLLEGE / INSTITUTION:</span>
                    <div className="text-xs text-slate-200">{formData.college}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase text-[10px]">CONTACT / EMAIL:</span>
                    <div className="text-xs text-slate-200">
                      {formData.phone} | {formData.email}
                    </div>
                  </div>

                  {formData.teamName && (
                    <div className="space-y-1">
                      <span className="text-slate-400 uppercase text-[10px]">TEAM NAME:</span>
                      <div className="text-xs text-cyan-300 font-bold">{formData.teamName}</div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase text-[10px]">ORDER & TXN REF:</span>
                    <div className="text-xs text-slate-300 font-mono">
                      {activeOrderId} {paymentResult?.payment_id ? `// ${paymentResult.payment_id}` : ''}
                    </div>
                  </div>
                </div>

                {/* Venue & QR Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gold/30">
                  <div className="space-y-0.5 text-[11px] font-mono text-slate-300">
                    <div className="text-gold font-bold">VENUE: SNIST CAMPUS, HYDERABAD</div>
                    <div className="text-slate-400">PRESENT THIS PASS AT REGISTRATION DESK</div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white text-black rounded border border-gold/60">
                    <QrCode className="w-10 h-10" />
                    <div className="text-[9px] font-mono leading-tight font-bold">
                      SCAN<br />DELEGATE<br />BADGE
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrintPass}
                  className="px-5 py-3 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD / PRINT PASS</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-3 bg-surface hover:bg-slate-800 text-slate-200 border border-gold/40 font-mono text-xs uppercase tracking-wider transition-colors ml-auto"
                >
                  RETURN TO FESTIVAL
                </button>
              </div>
            </div>
          )}

          {/* STEP: PROCESSING / VERIFYING SPINNER */}
          {(step === 'processing' || step === 'verifying') && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <RefreshCw className="w-12 h-12 text-gold animate-spin" />
                <Sparkles className="w-6 h-6 text-cyan-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-xl text-white uppercase">
                  {step === 'processing'
                    ? 'LAUNCHING RAZORPAY SECURE CHECKOUT...'
                    : 'AUTHENTICATING PAYMENT SIGNATURE...'}
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  Please do not refresh or close this window while your transaction is processed.
                </p>
              </div>
            </div>
          )}

          {/* STEP: REGISTRATION FORM */}
          {step === 'form' && (
            <form onSubmit={handlePaymentInitiation} className="space-y-6">
              {errorMessage && (
                <div className="p-4 bg-red-950/60 border border-red-500/50 rounded flex items-start gap-3 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Pass Tier Picker */}
              <div className="space-y-2">
                <label className="block font-mono text-xs text-gold uppercase tracking-wider font-bold">
                  // 1. SELECT REGISTRATION TIER
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TICKETS_DATA.map((tier) => (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`p-3.5 border text-left flex flex-col justify-between transition-all tech-corner-border ${
                        selectedTierId === tier.id
                          ? 'border-gold bg-gold/15 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                          : 'border-gold/20 bg-surface-subtle hover:border-gold/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-white text-sm uppercase">
                          {tier.title}
                        </span>
                        <span className="font-mono font-bold text-sm text-gold-light">
                          {tier.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans mt-1 line-clamp-2">
                        {tier.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Attendee Details Form */}
              <div className="space-y-4 pt-2">
                <label className="block font-mono text-xs text-gold uppercase tracking-wider font-bold">
                  // 2. PARTICIPANT & CONTACT INFORMATION
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gold" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-surface-subtle border border-gold/30 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gold" /> Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. johndoe@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface-subtle border border-gold/30 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>

                  {/* WhatsApp / Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gold" /> WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile (e.g. 9876543210)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-surface-subtle border border-gold/30 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>

                  {/* College / Institution */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-gold" /> College / Institution *
                    </label>
                    <input
                      type="text"
                      name="college"
                      required
                      placeholder="e.g. SNIST / JNTU / IIT / BITS"
                      value={formData.college}
                      onChange={handleInputChange}
                      className="w-full bg-surface-subtle border border-gold/30 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>

                  {/* Branch / Stream */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Department / Branch</label>
                    <input
                      type="text"
                      name="branch"
                      placeholder="e.g. CSE / ECE / MECH / EEE / AI-ML"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full bg-surface-subtle border border-gold/30 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>

                  {/* Year */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Year of Study</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full bg-surface-subtle border border-gold/30 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans"
                    >
                      <option value="1st Year">1st Year (B.Tech / Degree)</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Postgraduate / Professional">Postgraduate / Professional</option>
                    </select>
                  </div>
                </div>

                {/* Team Event Optional Fields */}
                {isTeamPass && (
                  <div className="p-4 bg-surface-subtle border border-gold/25 space-y-3 tech-corner-border mt-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                      <Users className="w-4 h-4" /> Team Details (If registering as a squad)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="teamName"
                        placeholder="Team Name (e.g. Team Robovengers)"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        className="bg-black/60 border border-gold/30 px-3 py-2 text-xs text-white focus:outline-none focus:border-gold font-sans"
                      />
                      <input
                        type="text"
                        name="teamMembers"
                        placeholder="Co-pilots / Member Names (Optional)"
                        value={formData.teamMembers}
                        onChange={handleInputChange}
                        className="bg-black/60 border border-gold/30 px-3 py-2 text-xs text-white focus:outline-none focus:border-gold font-sans"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Summary & Checkout CTA */}
              <div className="pt-4 border-t border-gold/30 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] text-slate-400 uppercase">
                    TOTAL PAYABLE AMOUNT:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-2xl sm:text-3xl text-gold-light">
                      ₹{amountNumeric}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 bg-gold/10 border border-gold/30 text-gold-light uppercase">
                      NO EXTRA GATEWAY CHARGES
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-mono font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] border border-gold group"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>PAY ₹{amountNumeric} VIA RAZORPAY</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Payment Modes Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Supports UPI (GPay, PhonePe, Paytm, CRED), Credit/Debit Cards, NetBanking, Wallets</span>
                </div>
                <div>Powered by Razorpay</div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
