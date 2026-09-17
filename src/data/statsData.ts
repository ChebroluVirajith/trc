import { StatisticMetric } from '../types';

export const STATS_DATA: StatisticMetric[] = [
  {
    label: 'Participants Nationwide',
    value: 5000,
    suffix: '+',
    caption: 'Student engineers, robotics enthusiasts and makers participating across all 14 domains.',
    code: 'LORE_01'
  },
  {
    label: 'Colleges & Universities',
    value: 85,
    suffix: '+',
    caption: 'Institutions represented across India bringing competitive robotics teams to SNIST.',
    code: 'LORE_02'
  },
  {
    label: 'Flagship Events & Labs',
    value: 14,
    suffix: '+',
    caption: 'Combat arenas, aerial tracks, all-terrain pits, aquatic basins, and masterclasses.',
    code: 'LORE_03'
  },
  {
    label: 'Annual Festival Editions',
    value: 16,
    suffix: '+',
    caption: 'Over a decade and a half of engineering legacy organized by The Robotics Club - SNIST.',
    code: 'LORE_04'
  }
];

export const FESTIVAL_METADATA = {
  edition: "ROBOVEDA'26",
  festDescriptor: "SREENIDHI'S ANNUAL TECHNICAL FEST",
  theme: "ASCENSION",
  dates: "OCTOBER 12, 13, 14, 2026",
  datesShort: "OCT 12, 13, 14",
  tagline: "EXPLORE THE UNWRITTEN LORE...",
  subtitle: "The convergence of ancient civilization wisdom and cybernetic robotics — from primordial mechanisms to intelligent autonomy and ascension.",
  organizer: "The Robotics Club - SNIST",
  institution: "Sreenidhi Institute of Science and Technology",
  location: "SNIST Campus, Yamnampet, Ghatkesar, Hyderabad, Telangana — 501301",
  certification: "ISO 20121:2012 Event Sustainability Management System Certified",
  contactPhone: "+91 63019 32007",
  contactEmail: "roboveda@sreenidhi.edu.in",
  officialWebsite: "https://www.theroboticsclubsnist.org/",
  titleLogo: "/img/theme/roboveda26_title_logo.png",
  roboguruImage: "/img/theme/roboguru_26.png",
  socials: {
    instagram: "https://www.instagram.com/roboveda/",
    facebook: "https://www.facebook.com/roboveda/",
    linkedin: "https://www.linkedin.com/company/the-robotics-club-snist",
    youtube: "https://www.youtube.com/channel/UCR1b0OFpQAOte2y2HrCs5eg"
  }
};

export const ANCIENT_RELICS = [
  {
    id: 'mesoamerica',
    name: 'Mayan / Aztec Solar Calendar',
    civilization: 'Mesoamerican Sun Stone',
    domain: 'Kinematics & Solar Mechanics',
    desc: 'Ancient astronomical gear alignments decoded into rotational robotics.'
  },
  {
    id: 'egypt',
    name: 'Eye of Ra / Horus',
    civilization: 'Egyptian Sacred Geometry',
    domain: 'Optical Sensors & Machine Vision',
    desc: 'The divine all-seeing eye reflected in autonomous LiDAR and vision systems.'
  },
  {
    id: 'indus',
    name: 'Indus Unicorn & Sacred Tree Seal',
    civilization: 'Harappan Metallurgy',
    domain: 'Material Science & Armor Chassis',
    desc: '5,000 years of pioneering metallurgy translated into combat robotics.'
  },
  {
    id: 'nordic',
    name: 'Nordic Celestial Longship',
    civilization: 'Viking Oceanic Navigation',
    domain: 'Autonomous Rovers & Amphibious ROVs',
    desc: 'Uncompromising navigation through harsh waters and uncharted terrain.'
  }
];
