import { TicketTier } from '../types';

export const TICKETS_DATA: TicketTier[] = [
  {
    id: 'master-pass',
    title: 'Master Access Pass',
    badge: 'ALL-INCLUSIVE',
    price: '₹1499',
    description: 'Ultimate festival pass granting multi-event entry, arena matches, flagship keynote sessions, and networking dinner.',
    features: [
      'Entry to all Combat & Arena Events',
      'Access to Pradarshan (Project Expo)',
      'Ideathon Registration included',
      'Official RoboVeda Kit & Merchandise',
      'Certificate of Master Participation'
    ],
    link: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    isPopular: true
  },
  {
    id: 'single-event-pass',
    title: 'Single Event Entry',
    badge: 'STANDARD',
    price: '₹399',
    description: 'Registration pass for a single competition category (Ranaveera, Pushpak, Gati, etc.) for team pilots.',
    features: [
      'Entry to 1 Selected Competitive Event',
      'Arena Testing Slot & Technical Scrutiny',
      'Participation Certificate',
      'Access to Spectator Viewing Decks'
    ],
    link: 'https://forms.gle/bnNtH7c5x2SM3MjGA'
  },
  {
    id: 'workshop-pass',
    title: 'Workshop Masterclass Pass',
    badge: 'CERTIFIED',
    price: '₹799',
    description: 'Hands-on intensive masterclass in Drone Dynamics or Robotics & IoT with hardware kit takeaway.',
    features: [
      'Full Day Hands-on Lab Masterclass',
      'Complete Takeaway Hardware/Component Kit',
      'Direct Mentorship from Industry UAV/IoT Leads',
      'Industry-Recognized ISO Certified Credential'
    ],
    link: 'https://forms.gle/bnNtH7c5x2SM3MjGA'
  },
  {
    id: 'pradarshan-combo',
    title: 'Pradarshan + Ideathon Combo',
    badge: 'INNOVATION',
    price: '₹599',
    description: 'Dual pass for student innovators showcasing both their project hardware prototype and venture idea pitch.',
    features: [
      'Project Expo Stall with Power & Table Space',
      'Ideathon Pitch Slot before Investor/Faculty Jury',
      'Direct Incubation & Grant Evaluation',
      'Innovation Delegate Certificates'
    ],
    link: 'https://forms.gle/bnNtH7c5x2SM3MjGA'
  }
];

export const HOSPITALITY_DATA = {
  title: "Outstation Hospitality & Stay",
  description: "Delegates and teams traveling to Hyderabad for RoboVeda'26 can reserve campus accommodation, food arrangements, and local transit support.",
  formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdftJdlL_9tZYBHYCpTuKjXscZXITjRajQLgn96ZR8nUZzqjA/viewform",
  contact: "+91 63019 32007",
  email: "roboveda@sreenidhi.edu.in"
};

export const CAMPUS_AMBASSADOR_DATA = {
  title: "Campus Ambassador Program",
  description: "Represent RoboVeda'26 at your university. Lead college delegations, earn exclusive merchandise, leadership credentials, and cash incentives.",
  formLink: "https://forms.gle/bnNtH7c5x2SM3MjGA"
};
