export interface EventCoordinator {
  name: string;
  role: 'Head' | 'Co-ordinator' | 'Lead' | 'Mentor';
  phone?: string;
  email?: string;
  image?: string;
}

export interface EventItem {
  id: string;
  number: string; // e.g. "01", "02"
  name: string;
  category: 'Combat' | 'Aerial' | 'Autonomous' | 'Speed' | 'Aquatic' | 'Mechanism' | 'Innovation' | 'Workshop' | 'Pradarshan' | 'Hackathon' | 'Ceremony';
  shortDesc: string;
  fullDesc: string;
  tagline: string;
  bannerImage: string;
  iconBg: string;
  iconFg: string;
  pdfRulebook?: string;
  arenaVideo?: string;
  prizePool?: string;
  coordinators: EventCoordinator[];
  registrationUrl?: string;
  tags: string[];
  schedule?: string;
  location?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department?: string;
  image: string;
  phone?: string;
  email?: string;
}

export interface TeamCategory {
  id: string;
  title: string;
  lead?: string;
  image?: string;
  members?: TeamMember[];
}

export interface SponsorItem {
  name: string;
  category: 'Title Sponsor' | 'Associate Sponsor' | 'Previous Sponsor' | 'Media Partner';
  logo: string;
  url?: string;
  description?: string;
}

export interface StatisticMetric {
  label: string;
  value: number;
  suffix: string;
  caption: string;
  code: string;
}

export interface TicketTier {
  id: string;
  title: string;
  badge?: string;
  price: string;
  description: string;
  features: string[];
  link: string;
  isPopular?: boolean;
}

export type BlueprintPhase = 1 | 2 | 3 | 4 | 5;

export interface PhaseInfo {
  phase: BlueprintPhase;
  name: string;
  sub: string;
  desc: string;
  schematicTag: string;
}
