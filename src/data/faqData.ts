export interface FAQItem {
  id: string;
  category: 'Registration & Teams' | 'Robot Specs & Rules' | 'Certificates & OD' | 'Hospitality & Venue';
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Registration & Teams',
    question: 'Can team members belong to different colleges or departments?',
    answer: 'Yes! Cross-college and cross-departmental teams are completely eligible to participate across all 14 RoboVeda’26 events and workshops.'
  },
  {
    id: 'faq-2',
    category: 'Registration & Teams',
    question: 'What is the maximum allowed team size for robotics events?',
    answer: 'Most arena events allow teams of 1 to 4 members. For specialized hackathons or multi-rover swarms, please refer to the specific event rulebook.'
  },
  {
    id: 'faq-3',
    category: 'Robot Specs & Rules',
    question: 'Are ready-made robotic kits (like Lego/off-the-shelf chassis) allowed in combat arenas?',
    answer: 'For combat arenas (like Yoddha and Vyuha), bots must be custom-fabricated by the participating team to ensure safety and compliance with weight/power limits. Modular motor drivers, microcontrollers (Arduino/ESP32/STM32), and standard RC transceivers are permitted.'
  },
  {
    id: 'faq-4',
    category: 'Robot Specs & Rules',
    question: 'What radio frequency and battery safety standards are mandatory?',
    answer: 'All remote-controlled robots must operate on standard 2.4 GHz digital frequency to avoid signal interference. Lithium polymer (LiPo) batteries must be securely housed with external master kill-switches.'
  },
  {
    id: 'faq-5',
    category: 'Certificates & OD',
    question: 'Will all participants receive official participation certificates and On-Duty (OD) letters?',
    answer: 'Yes! All registered participants will receive official ISO 20121:2012 certified certificates of participation from The Robotics Club - SNIST. Official stamped OD attendance letters will be provided at the registration desk.'
  },
  {
    id: 'faq-6',
    category: 'Hospitality & Venue',
    question: 'Is accommodation provided for outstation participants arriving from other states?',
    answer: 'Yes, secure on-campus accommodation is available on a pre-booking basis for outstation teams with 24/7 security, separate lodging for male and female participants, and food court access.'
  }
];
