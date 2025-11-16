export interface CalendarViewProps {
  className?: string;
  onDateClick?: (date: Date) => void;
  onEventClick?: (eventId: string) => void;
}
