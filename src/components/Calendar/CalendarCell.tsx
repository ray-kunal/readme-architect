import { memo } from 'react';
import { clsx } from 'clsx';
import { isCurrentMonth, isTodayDate, isSameDayDate } from '@/utils/date.utils';
import { CalendarEvent } from '@/hooks/useEventManager';
import { getLighterColor } from '@/utils/event.utils';

interface CalendarCellProps {
  date: Date;
  currentDate: Date;
  selectedDate: Date | null;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (eventId: string) => void;
}

export const CalendarCell = memo(({
  date,
  currentDate,
  selectedDate,
  events,
  onDateClick,
  onEventClick,
}: CalendarCellProps) => {
  const isInCurrentMonth = isCurrentMonth(date, currentDate);
  const isToday = isTodayDate(date);
  const isSelected = selectedDate ? isSameDayDate(date, selectedDate) : false;
  
  const displayedEvents = events.slice(0, 3);
  const hasMoreEvents = events.length > 3;

  return (
    <div
      className={clsx(
        'min-h-[100px] border border-border p-2 cursor-pointer transition-colors',
        'hover:bg-accent/50',
        {
          'bg-muted/30 text-muted-foreground': !isInCurrentMonth,
          'bg-background': isInCurrentMonth,
          'ring-2 ring-primary ring-inset': isSelected,
        }
      )}
      onClick={() => onDateClick(date)}
      role="gridcell"
      aria-label={`${date.toDateString()}, ${events.length} events`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onDateClick(date);
        }
      }}
    >
      <div
        className={clsx(
          'text-sm font-medium mb-1 w-8 h-8 flex items-center justify-center rounded-full',
          {
            'bg-primary text-primary-foreground': isToday,
            'text-foreground': !isToday && isInCurrentMonth,
          }
        )}
      >
        {date.getDate()}
      </div>

      <div className="space-y-1">
        {displayedEvents.map((event) => (
          <div
            key={event.id}
            className="text-xs px-2 py-1 rounded truncate cursor-pointer transition-transform hover:scale-105"
            style={{
              backgroundColor: getLighterColor(event.color),
              color: event.color,
              borderLeft: `3px solid ${event.color}`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event.id);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onEventClick(event.id);
              }
            }}
          >
            {event.title}
          </div>
        ))}
        {hasMoreEvents && (
          <div className="text-xs text-muted-foreground px-2">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
});

CalendarCell.displayName = 'CalendarCell';
