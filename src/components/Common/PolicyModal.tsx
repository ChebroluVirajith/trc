import React from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Truck } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: 'privacy' | 'terms' | 'refund' | 'shipping';
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  activeTab = 'privacy'
}) => {
  const [tab, setTab] = React.useState(activeTab);

  React.useEffect(() => {
    setTab(activeTab);
  }, [activeTab]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-3xl bg-surface border border-surface-border tech-corner-border shadow-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-border bg-surface-subtle">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-industrial-orange animate-pulse" />
            <h2 className="text-xl font-display font-bold text-white tracking-wide">
              GOVERNANCE & LEGAL COMPLIANCE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-surface-border bg-black/40 px-6 pt-3 gap-2 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setTab('privacy')}
            className={`flex items-center gap-2 pb-3 px-3 border-b-2 font-medium transition-colors ${
              tab === 'privacy'
                ? 'border-industrial-orange text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-industrial-orange" />
            PRIVACY POLICY
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`flex items-center gap-2 pb-3 px-3 border-b-2 font-medium transition-colors ${
              tab === 'terms'
                ? 'border-industrial-orange text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            TERMS & CONDITIONS
          </button>
          <button
            onClick={() => setTab('refund')}
            className={`flex items-center gap-2 pb-3 px-3 border-b-2 font-medium transition-colors ${
              tab === 'refund'
                ? 'border-industrial-orange text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            REFUND POLICY
          </button>
          <button
            onClick={() => setTab('shipping')}
            className={`flex items-center gap-2 pb-3 px-3 border-b-2 font-medium transition-colors ${
              tab === 'shipping'
                ? 'border-industrial-orange text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-4 h-4 text-green-400" />
            DELIVERY & TICKETING
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto font-sans text-sm text-slate-300 space-y-4 leading-relaxed">
          {tab === 'privacy' && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Privacy Policy</h3>
              <p className="mb-3">
                RoboVeda and The Robotics Club - SNIST respect your privacy. All registration details, participant data, and identification submitted for RoboVeda'26 are securely processed strictly for event accreditation, workshop kit allocations, and safety management.
              </p>
              <p className="mb-3">
                We do not sell, trade, or transfer participant contact or personal credentials to third-party marketing entities. Information collected via official Google Forms or payment gateways is secured under industry standard SSL encryption.
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                Institutional Authority: ROBOVEDA, Sreenidhi Institute of Science and Technology, Yamnampet, Ghatkesar, Hyderabad.
              </div>
            </div>
          )}

          {tab === 'terms' && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Terms & Conditions</h3>
              <p className="mb-3">
                1. Every participant must carry a valid institutional student ID card along with their registration confirmation QR/code.
              </p>
              <p className="mb-3">
                2. All robotic units, bots, rovers, and UAV multicopters must pass the technical scrutiny team before entering competitive arenas. Any bot found exceeding weight limits or voltage thresholds will be disqualified.
              </p>
              <p className="mb-3">
                3. The decision of the arena referees, judges, and event heads is final and binding.
              </p>
            </div>
          )}

          {tab === 'refund' && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Cancellation & Refund Policy</h3>
              <p className="mb-3">
                Due to advance procurement of workshop hardware kits, arena reservations, and certification processing:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Event passes and workshop seat registrations are non-refundable once payment is confirmed.</li>
                <li>In the unforeseen scenario of event rescheduling, registrations remain valid for the updated schedule without extra charge.</li>
                <li>For technical payment failures or duplicate transactions, queries will be reconciled within 5–7 working days upon contacting roboveda@sreenidhi.edu.in.</li>
              </ul>
            </div>
          )}

          {tab === 'shipping' && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Ticketing & Kit Delivery Policy</h3>
              <p className="mb-3">
                RoboVeda is an on-campus physical festival. All entry passes, event credentials, and badges are digitally delivered via email upon form confirmation.
              </p>
              <p className="mb-3">
                Physical hardware kits for Workshop participants (Drone Dynamics, IoT & Robotics) and delegate merchandise will be handed over in person at the Registration Desk upon arrival on Day 1.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-subtle flex justify-between items-center text-xs font-mono text-slate-500">
          <span>ISO 20121:2012 Sustainability Standard</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-industrial-orange text-white font-bold hover:bg-orange-600 transition-colors"
          >
            ACKNOWLEDGE
          </button>
        </div>
      </div>
    </div>
  );
};
