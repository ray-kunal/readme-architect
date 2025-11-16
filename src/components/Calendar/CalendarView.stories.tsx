import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CalendarView } from './CalendarView';
import { CalendarViewProps } from './CalendarView.types';
import { useEventManager } from '@/hooks/useEventManager';
import { useCalendar } from '@/hooks/useCalendar';
import { defaultEvents, emptyEvents, weekViewEvents, largeDatasetEvents } from './CalendarView.mock-data';
import { useEffect } from 'react';

// Wrapper component to initialize events and state for stories
const CalendarWrapper = ({ 
  events = [], 
  initialViewMode = 'month' as 'month' | 'week',
  initialDate = new Date(),
  onDateClick,
  onEventClick 
}: {
  events?: any[];
  initialViewMode?: 'month' | 'week';
  initialDate?: Date;
  onDateClick?: (date: Date) => void;
  onEventClick?: (eventId: string) => void;
}) => {
  const { events: currentEvents, addEvent } = useEventManager();
  const { setViewMode, setCurrentDate } = useCalendar();

  useEffect(() => {
    // Clear existing events and add new ones
    const currentEventIds = currentEvents.map(e => e.id);
    currentEventIds.forEach(id => {
      useEventManager.getState().deleteEvent(id);
    });
    
    // Add story-specific events
    events.forEach(event => {
      addEvent({
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        color: event.color
      });
    });
  }, [events, addEvent, currentEvents]);

  useEffect(() => {
    setViewMode(initialViewMode);
  }, [initialViewMode, setViewMode]);

  useEffect(() => {
    setCurrentDate(initialDate);
  }, [initialDate, setCurrentDate]);

  return (
    <div style={{ height: '100vh', width: '100%', padding: '1rem' }}>
      <CalendarView 
        onDateClick={onDateClick}
        onEventClick={onEventClick}
      />
    </div>
  );
};

const meta: Meta<typeof CalendarWrapper> = {
  title: 'Components/Calendar/CalendarView',
  component: CalendarWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive calendar component with month and week views, event management, and interactive controls.',
      },
    },
  },
  args: {
    onDateClick: action('date-clicked'),
    onEventClick: action('event-clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with sample events
export const Default: Story = {
  args: {
    events: defaultEvents,
    initialViewMode: 'month',
    initialDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default calendar view with sample events displayed in month view.',
      },
    },
  },
};

// Empty calendar story
export const Empty: Story = {
  args: {
    events: emptyEvents,
    initialViewMode: 'month',
    initialDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar view with no events - shows how the calendar looks when empty.',
      },
    },
  },
};

// Week view story with overlapping events
export const WeekView: Story = {
  args: {
    events: weekViewEvents,
    initialViewMode: 'week',
    initialDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Week view with overlapping events to demonstrate time-based layout and event positioning.',
      },
    },
  },
};

// Large dataset story
export const LargeDataset: Story = {
  args: {
    events: largeDatasetEvents,
    initialViewMode: 'month',
    initialDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with a large number of events (20+) to test performance and rendering with heavy data.',
      },
    },
  },
};

// Interactive playground with controls
export const InteractivePlayground: Story = {
  args: {
    events: defaultEvents,
    initialViewMode: 'month',
    initialDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground with controls to experiment with different view modes, dates, and event sets.',
      },
    },
  },
};

// Focus on specific month with events
export const SpecificMonth: Story = {
  args: {
    events: [
      {
        id: 'dec-event-1',
        title: 'Holiday Party',
        description: 'Annual company holiday celebration',
        startDate: new Date(2024, 11, 15, 18, 0), // December 15, 2024
        endDate: new Date(2024, 11, 15, 22, 0),
        color: '#ef4444',
      },
      {
        id: 'dec-event-2',
        title: 'Year End Review',
        description: 'Performance review and planning session',
        startDate: new Date(2024, 11, 20, 14, 0), // December 20, 2024
        endDate: new Date(2024, 11, 20, 17, 0),
        color: '#3b82f6',
      },
      {
        id: 'dec-event-3',
        title: 'New Year Planning',
        description: 'Strategic planning for next year',
        startDate: new Date(2024, 11, 30, 10, 0), // December 30, 2024
        endDate: new Date(2024, 11, 30, 12, 0),
        color: '#10b981',
      },
    ],
    initialViewMode: 'month',
    initialDate: new Date(2024, 11, 1), // December 2024
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar focused on December 2024 with holiday-themed events.',
      },
    },
  },
};