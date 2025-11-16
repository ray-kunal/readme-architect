import { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, Calendar, CalendarDays } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { Button } from '@/components/primitives/Button';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { CalendarViewProps } from './CalendarView.types';

export const CalendarView = ({ className, onDateClick, onEventClick }: CalendarViewProps) => {
  const {
    viewMode,
    setViewMode,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousWeek,
    goToNextWeek,
    setSelectedDate,
  } = useCalendar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [modalDefaultDate, setModalDefaultDate] = useState<Date | undefined>();

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setModalDefaultDate(date);
    setSelectedEventId(null);
    setIsModalOpen(true);
    onDateClick?.(date);
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setModalDefaultDate(undefined);
    setIsModalOpen(true);
    onEventClick?.(eventId);
  };

  const handlePrevious = () => {
    if (viewMode === 'month') {
      goToPreviousMonth();
    } else {
      goToPreviousWeek();
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      goToNextMonth();
    } else {
      goToNextWeek();
    }
  };

  return (
    <div className={clsx('flex flex-col h-full bg-background', className)}>
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'month' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('month')}
            aria-label="Month view"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('week')}
            aria-label="Week view"
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Week
          </Button>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 overflow-auto p-4">
        {viewMode === 'month' ? (
          <MonthView onDateClick={handleDateClick} onEventClick={handleEventClick} />
        ) : (
          <WeekView onEventClick={handleEventClick} />
        )}
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEventId(null);
          setModalDefaultDate(undefined);
        }}
        eventId={selectedEventId}
        defaultDate={modalDefaultDate}
      />
    </div>
  );
};
