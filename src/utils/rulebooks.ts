// Rulebook locator utility for ROBOVEDA'26 Events

export interface EventRulebookInfo {
  eventName: string;
  pdfPath: string;
  category: string;
}

export const EVENT_RULEBOOKS: Record<string, string> = {
  'ranaveera': "/RV 25 Rule books/RANAVEERA RV'25 new.pdf",
  'pushpak': '/RV 25 Rule books/PUSPHAK RV 25.pdf',
  'sarvaagami': "/RV 25 Rule books/SARVAAGAMI RV'25.pdf",
  'sarvagami': "/RV 25 Rule books/SARVAAGAMI RV'25.pdf",
  'yoddha': "/RV 25 Rule books/YODDHA RV'25.pdf",
  'lakshmanarekha': "/RV 25 Rule books/LAKSHMANREKHA RV'25 new.pdf",
  'lakshman rekha': "/RV 25 Rule books/LAKSHMANREKHA RV'25 new.pdf",
  'gati': "/RV 25 Rule books/GATI RV'25.pdf",
  'goalaa': "/RV 25 Rule books/GOALAA RV'25 new.pdf",
  'goala': "/RV 25 Rule books/GOALAA RV'25 new.pdf",
  'yantraa': "/RV 25 Rule books/YANTRAA RV'25.pdf",
  'yantra': "/RV 25 Rule books/YANTRAA RV'25.pdf",
  'samanvayi': "/RV 25 Rule books/SAMANVAYI RV'25new.pdf",
  'jaladhmatra': "/RV 25 Rule books/JALADHMATRA RV'25.pdf",
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
    return "/RV 25 Rule books/RANAVEERA RV'25 new.pdf";
  }

  return null;
};
