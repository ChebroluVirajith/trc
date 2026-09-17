import React from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { MapPin, Phone, Mail, Globe, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import { MinimalTechBackground } from '../Background/MinimalTechBackground';

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contacts"
      className="relative py-24 sm:py-32 bg-[#0f1929] border-b border-gold/25 overflow-hidden"
    >
      {/* Minimal Tech Background Animation */}
      <MinimalTechBackground variant="mixed" particleCount={30} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Heading matching roboveda.org */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <TechnicalBadge code="06 // COMMUNICATE" label="CONTACT & CAMPUS HUB" variant="gold" />
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold-light font-bold">
            HAVE QUESTIONS?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
            CONTACT <span className="text-gold-gradient">US</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Embedded Google Maps Iframe matching roboveda.org (7 Cols) */}
          <div className="lg:col-span-7 bg-surface/90 border border-gold/30 tech-corner-border p-3 rounded-lg overflow-hidden shadow-2xl">
            <iframe
              title="SNIST Campus Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.088806773539!2d78.6639958156018!3d17.45546306856446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb7612c2c68369%3A0x9ea4b426b7e3699!2sSreenidhi+Institute+of+Science+%26+Technology!5e0!3m2!1sen!2sin!4v1562396110895!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="rounded"
            />
          </div>

          {/* Right Column: Contact Details matching roboveda.org (5 Cols) */}
          <div className="lg:col-span-5 p-8 bg-surface/90 border border-gold/30 tech-corner-border rounded-lg shadow-2xl space-y-6">
            <div className="space-y-4 font-sans text-sm text-slate-300">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-xs text-gold-light uppercase font-bold block">ADDRESS:</span>
                  <span className="text-white font-medium">
                    SNIST, Yamnampet, Ghatkesar, Hyderabad, Telangana, 501301
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-xs text-gold-light uppercase font-bold block">PHONE:</span>
                  <a
                    href="tel:+916301932007"
                    onClick={() => audioEngine.playClick()}
                    className="text-white hover:text-gold font-mono font-bold text-base transition-colors"
                  >
                    +91 63019 32007
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-xs text-gold-light uppercase font-bold block">EMAIL:</span>
                  <a
                    href="mailto:roboveda@sreenidhi.edu.in"
                    onClick={() => audioEngine.playClick()}
                    className="text-white hover:text-gold font-mono transition-colors"
                  >
                    roboveda@sreenidhi.edu.in
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-xs text-cyan-300 uppercase font-bold block">WEBSITE:</span>
                  <a
                    href="https://www.theroboticsclubsnist.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => audioEngine.playClick()}
                    className="text-white hover:text-cyan-300 font-mono transition-colors"
                  >
                    www.theroboticsclubsnist.org
                  </a>
                </div>
              </div>
            </div>

            {/* Social Handles */}
            <div className="pt-4 border-t border-gold/20 space-y-3">
              <span className="font-mono text-xs text-gold-light font-bold uppercase block tracking-wider">
                OFFICIAL SOCIAL CHANNELS:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/roboveda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playClick()}
                  className="p-3 bg-surface hover:bg-gold/20 text-gold-light hover:text-white border border-gold/30 hover:border-gold rounded-full transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://www.facebook.com/roboveda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playClick()}
                  className="p-3 bg-surface hover:bg-gold/20 text-gold-light hover:text-white border border-gold/30 hover:border-gold rounded-full transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/company/the-robotics-club-snist"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playClick()}
                  className="p-3 bg-surface hover:bg-gold/20 text-gold-light hover:text-white border border-gold/30 hover:border-gold rounded-full transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="https://www.youtube.com/channel/UCR1b0OFpQAOte2y2HrCs5eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playClick()}
                  className="p-3 bg-surface hover:bg-gold/20 text-gold-light hover:text-white border border-gold/30 hover:border-gold rounded-full transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
