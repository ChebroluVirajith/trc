// Rulebook locator utility for ROBOVEDA'26 Events

export interface EventRulebookInfo {
  eventName: string;
  pdfPath: string;
  category: string;
}

export const EVENT_RULEBOOKS: Record<string, string> = {
  'ranaveera': '/rulebooks/ranaveera.pdf',
  'pushpak': '/rulebooks/pushpak.pdf',
  'sarvaagami': '/rulebooks/sarvaagami.pdf',
  'sarvagami': '/rulebooks/sarvaagami.pdf',
  'yoddha': '/rulebooks/yoddha.pdf',
  'lakshmanarekha': '/rulebooks/lakshmanarekha.pdf',
  'lakshman rekha': '/rulebooks/lakshmanarekha.pdf',
  'gati': '/rulebooks/gati.pdf',
  'goalaa': '/rulebooks/goalaa.pdf',
  'goala': '/rulebooks/goalaa.pdf',
  'yantraa': '/rulebooks/yantraa.pdf',
  'yantra': '/rulebooks/yantraa.pdf',
  'samanvayi': '/rulebooks/samanvayi.pdf',
  'jaladhmatra': '/rulebooks/jaladhmatra.pdf',
};

/**
 * Returns the matching PDF rulebook URL for a given event or pass title
 */
export const getRulebookForEvent = (nameOrTitle?: string): string | null => {
  if (!nameOrTitle) return null;
  const lower = nameOrTitle.toLowerCase().trim();

  for (const [key, path] of Object.entries(EVENT_RULEBOOKS)) {
    if (lower.includes(key)) {
      return path;
    }
  }

  // If general or master pass, return Ranaveera flagship rulebook as primary reference
  if (lower.includes('master') || lower.includes('single') || lower.includes('pass')) {
    return '/rulebooks/ranaveera.pdf';
  }

  return null;
};
