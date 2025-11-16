import { memo, useMemo } from 'react';
import { clsx } from 'clsx';
import {
  generateWeekGrid,
  formatDate,
  getHoursArray,
  formatHour,
  calculateEventTopPosition,
  calculateEventHeight,
  isTodayDate,
} from '@/utils/date.utils';
import { useCalendar } from '@/hooks/useCalendar';
import { useEventManager, CalendarEvent } from '@/hooks/useEventManager';
import { getLighterColor } from '@/utils/event.utils';

interface WeekViewProps {
  onEventClick: (eventId: string) => void;
}

export const WeekView = memo(({ onEventClick }: WeekViewProps) => {
  const currentDate = useCalendar((state) => state.currentDate);
  const getEventsForRange = useEventManager((state) => state.getEventsForRange);

  const weekGrid = useMemo(() => generateWeekGrid(currentDate), [currentDate]);
  const hours = useMemo(() => getHoursArray(), []);

  // Get events for the entire week
  const weekEvents = useMemo(() => {
    const weekStart = weekGrid[0];
    const weekEnd = new Date(weekGrid[6]);
    weekEnd.setHours(23, 59, 59, 999);
    return getEventsForRange(weekStart, weekEnd);
  }, [weekGrid, getEventsForRange]);

  // Group events by day
  const eventsByDay = useMemo(() => {
    const grouped: Map<string, CalendarEvent[]> = new Map();
    
    weekGrid.forEach((day) => {
      const dayKey = formatDate(day, 'yyyy-MM-dd');
      const dayEvents = weekEvents.filter((event) => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        const dayStart = new Date(day);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(day);
        dayEnd.setHours(23, 59, 59, 999);
        
        return eventStart <= dayEnd && eventEnd >= dayStart;
      });
      grouped.set(dayKey, dayEvents);
    });
    
    return grouped;
  }, [weekGrid, weekEvents]);

  return (
    <div className="flex flex-col h-full">
      {/* Week Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-foreground">
          {formatDate(weekGrid[0], 'MMM d')} - {formatDate(weekGrid[6], 'MMM d, yyyy')}
        </h2>
      </div>

      <div className="flex-1 flex overflow-auto">
        {/* Time Column */}
        <div className="w-16 flex-shrink-0">
          <div className="h-12" /> {/* Header spacer */}
          {hours.map((hour) => (
            <div key={hour} className="h-16 text-xs text-muted-foreground pr-2 text-right">
              {formatHour(hour)}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="flex-1 grid grid-cols-7 gap-px bg-border">
          {weekGrid.map((day) => {
            const dayKey = formatDate(day, 'yyyy-MM-dd');
            const dayEvents = eventsByDay.get(dayKey) || [];
            const isToday = isTodayDate(day);

            return (
              <div key={dayKey} className="flex flex-col">
                {/* Day Header */}
                <div
                  className={clsx(
                    'h-12 flex flex-col items-center justify-center border-b border-border bg-background',
                    {
                      'bg-primary/10': isToday,
                    }
                  )}
                >
                  <div className="text-xs text-muted-foreground">
                    {formatDate(day, 'EEE')}
                  </div>
                  <div
                    className={clsx('text-lg font-semibold', {
                      'bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center':
                        isToday,
                    })}
                  >
                    {formatDate(day, 'd')}
                  </div>
                </div>

                {/* Hour Grid */}
                <div className="relative flex-1 bg-background">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="h-16 border-b border-border/50"
                    />
                  ))}

                  {/* Events */}
                  <div className="absolute inset-0 pointer-events-none">
                    {dayEvents.map((event) => {
                      const top = calculateEventTopPosition(event.startDate);
                      const height = calculateEventHeight(event.startDate, event.endDate);

                      return (
                        <div
                          key={event.id}
                          className="absolute left-0 right-0 mx-1 rounded px-2 py-1 text-xs cursor-pointer pointer-events-auto overflow-hidden transition-transform hover:scale-105 hover:z-10"
                          style={{
                            top: `${top}%`,
                            height: `${height}%`,
                            backgroundColor: getLighterColor(event.color),
                            borderLeft: `3px solid ${event.color}`,
                            color: event.color,
                          }}
                          onClick={() => onEventClick(event.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onEventClick(event.id);
                            }
                          }}
                        >
                          <div className="font-semibold truncate">{event.title}</div>
                          <div className="text-xs opacity-75">
                            {formatDate(event.startDate, 'h:mm a')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

WeekView.displayName = 'WeekView';
