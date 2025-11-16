import { memo, useMemo } from 'react';
import { generateMonthGrid, formatDate } from '@/utils/date.utils';
import { useCalendar } from '@/hooks/useCalendar';
import { useEventManager } from '@/hooks/useEventManager';
import { CalendarCell } from './CalendarCell';

interface MonthViewProps {
  onDateClick: (date: Date) => void;
  onEventClick: (eventId: string) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MonthView = memo(({ onDateClick, onEventClick }: MonthViewProps) => {
  const currentDate = useCalendar((state) => state.currentDate);
  const selectedDate = useCalendar((state) => state.selectedDate);
  const getEventsForDate = useEventManager((state) => state.getEventsForDate);

  // Memoize the grid to avoid recalculation
  const monthGrid = useMemo(() => generateMonthGrid(currentDate), [currentDate]);

  return (
    <div className="flex flex-col">
      {/* Month/Year Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-foreground">
          {formatDate(currentDate, 'MMMM yyyy')}
        </h2>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-px bg-border mb-px">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="bg-muted py-2 text-center text-sm font-semibold text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-border" role="grid">
        {monthGrid.map((date) => {
          const events = getEventsForDate(date);
          return (
            <CalendarCell
              key={date.toISOString()}
              date={date}
              currentDate={currentDate}
              selectedDate={selectedDate}
              events={events}
              onDateClick={onDateClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
});

MonthView.displayName = 'MonthView';
