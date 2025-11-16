import { CalendarEvent } from '@/hooks/useEventManager';

export const EVENT_COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
];

/**
 * Get a lighter version of a color for backgrounds
 */
export const getLighterColor = (color: string): string => {
  // Convert hex to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  // Make it lighter (blend with white)
  const lighten = 0.85;
  const newR = Math.round(r + (255 - r) * lighten);
  const newG = Math.round(g + (255 - g) * lighten);
  const newB = Math.round(b + (255 - b) * lighten);
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

/**
 * Sort events by start time
 */
export const sortEventsByStartTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

/**
 * Check if two events overlap
 */
export const eventsOverlap = (event1: CalendarEvent, event2: CalendarEvent): boolean => {
  return event1.startDate < event2.endDate && event2.startDate < event1.endDate;
};

/**
 * Group overlapping events for week view positioning
 */
export const groupOverlappingEvents = (events: CalendarEvent[]): CalendarEvent[][] => {
  if (events.length === 0) return [];
  
  const sorted = sortEventsByStartTime(events);
  const groups: CalendarEvent[][] = [];
  
  sorted.forEach((event) => {
    let placed = false;
    
    for (const group of groups) {
      const overlaps = group.some((e) => eventsOverlap(e, event));
      if (overlaps) {
        group.push(event);
        placed = true;
        break;
      }
    }
    
    if (!placed) {
      groups.push([event]);
    }
  });
  
  return groups;
};

/**
 * Validate event data
 */
export const validateEvent = (
  title: string,
  startDate: Date,
  endDate: Date
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!title.trim()) {
    errors.push('Title is required');
  }
  
  if (startDate >= endDate) {
    errors.push('End date must be after start date');
  }
  
  if (isNaN(startDate.getTime())) {
    errors.push('Invalid start date');
  }
  
  if (isNaN(endDate.getTime())) {
    errors.push('Invalid end date');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};
