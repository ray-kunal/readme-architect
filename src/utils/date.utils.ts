import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  isSameDay,
  startOfDay,
  endOfDay,
  addMonths,
  subMonths,
} from 'date-fns';

/**
 * Generate a 42-day grid (6 weeks) for month view
 */
export const generateMonthGrid = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: Date[] = [];
  let currentDate = startDate;

  while (currentDate <= endDate || days.length < 42) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return days.slice(0, 42); // Ensure exactly 42 days
};

/**
 * Generate a 7-day grid for week view
 */
export const generateWeekGrid = (date: Date): Date[] => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const days: Date[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(addDays(weekStart, i));
  }

  return days;
};

/**
 * Check if a date is in the current month
 */
export const isCurrentMonth = (date: Date, referenceDate: Date): boolean => {
  return isSameMonth(date, referenceDate);
};

/**
 * Check if a date is today
 */
export const isTodayDate = (date: Date): boolean => {
  return isToday(date);
};

/**
 * Check if two dates are the same day
 */
export const isSameDayDate = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

/**
 * Format date for display
 */
export const formatDate = (date: Date, formatString: string): string => {
  return format(date, formatString);
};

/**
 * Get the start and end of a day
 */
export const getDayBounds = (date: Date): { start: Date; end: Date } => {
  return {
    start: startOfDay(date),
    end: endOfDay(date),
  };
};

/**
 * Get hours array for week view (0-23)
 */
export const getHoursArray = (): number[] => {
  return Array.from({ length: 24 }, (_, i) => i);
};

/**
 * Format hour for display (e.g., "9 AM", "2 PM")
 */
export const formatHour = (hour: number): string => {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
};

/**
 * Calculate top position percentage for an event in week view
 */
export const calculateEventTopPosition = (date: Date): number => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (hours * 60 + minutes) / (24 * 60) * 100;
};

/**
 * Calculate height percentage for an event in week view
 */
export const calculateEventHeight = (startDate: Date, endDate: Date): number => {
  const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
  const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
  const duration = endMinutes - startMinutes;
  return (duration / (24 * 60)) * 100;
};
