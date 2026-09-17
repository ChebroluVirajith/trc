import React, { useState, useMemo } from 'react';
import { FAQ_DATA, FAQItem } from '../../data/faqData';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { ChevronDown, HelpCircle, Search, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { FESTIVAL_METADATA } from '../../data/statsData';

const FAQ_CATEGORIES = [
  'ALL',
  'Registration & Teams',
  'Robot Specs & Rules',
  'Certificates & OD',
  'Hospitality & Venue'
];

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 bg-[#02050b] border-b border-gold/20 tech-grid-bg overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <TechnicalBadge code="07 // HELPDESK" label="FREQUENTLY ASKED QUESTIONS" variant="gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
            QUESTIONS & <span className="text-gold-gradient">GUIDELINES</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-sans">
            Everything you need to know about team eligibility, bot fabrication rules, OD letters, and on-campus stay.
          </p>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full bg-black/60 border border-gold/25 pl-10 pr-4 py-2.5 rounded text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 font-mono text-xs no-scrollbar">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 whitespace-nowrap transition-all border rounded-sm ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-gold-light via-gold to-gold-amber text-black font-bold border-gold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                    : 'bg-black/50 text-slate-300 border-gold/20 hover:text-white hover:border-gold/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-black/40 border border-gold/20 rounded-lg text-slate-400 font-mono text-xs">
              No matching questions found. Reach out directly to our student coordinators below!
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-lg border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-black/80 border-gold shadow-[0_0_20px_rgba(212,175,55,0.15)] ring-1 ring-gold/30'
                      : 'bg-black/40 border-gold/15 hover:border-gold/40'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-gold' : 'text-slate-500'}`} />
                      <span className="font-display font-bold text-white text-base sm:text-lg">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gold-light flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-slate-300 text-sm font-sans leading-relaxed border-t border-gold/10">
                      <div className="pt-3">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 rounded-lg bg-black/60 border border-gold/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-white text-base uppercase">
              Still have questions regarding rules or slots?
            </h4>
            <p className="text-xs text-slate-400 font-sans">
              Our coordinator helpline is active 24/7 to support participating teams.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${FESTIVAL_METADATA.contactPhone}`}
              className="px-4 py-2.5 rounded bg-gold text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Helpline</span>
            </a>
            <a
              href={`mailto:${FESTIVAL_METADATA.contactEmail}`}
              className="px-4 py-2.5 rounded bg-black border border-gold/30 text-gold-light font-display font-bold text-xs uppercase tracking-wider hover:border-gold transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Email Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
