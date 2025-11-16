import { create } from 'zustand';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color: string;
}

interface EventManagerState {
  events: CalendarEvent[];
  eventMap: Map<string, CalendarEvent>;
  activeEventId: string | null;
  
  // Actions
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  setActiveEventId: (id: string | null) => void;
  getEventById: (id: string) => CalendarEvent | undefined;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForRange: (startDate: Date, endDate: Date) => CalendarEvent[];
}

const generateId = () => `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
};

const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  const dateTime = date.getTime();
  const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
  const endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
  return dateTime >= startTime && dateTime <= endTime;
};

export const useEventManager = create<EventManagerState>((set, get) => ({
  events: [],
  eventMap: new Map(),
  activeEventId: null,

  addEvent: (eventData) => {
    const id = generateId();
    const event = { ...eventData, id };
    
    set((state) => {
      const newMap = new Map(state.eventMap);
      newMap.set(id, event);
      return {
        events: [...state.events, event],
        eventMap: newMap,
      };
    });
  },

  updateEvent: (id, updates) => {
    set((state) => {
      const existingEvent = state.eventMap.get(id);
      if (!existingEvent) return state;

      const updatedEvent = { ...existingEvent, ...updates };
      const newMap = new Map(state.eventMap);
      newMap.set(id, updatedEvent);

      return {
        events: state.events.map((e) => (e.id === id ? updatedEvent : e)),
        eventMap: newMap,
      };
    });
  },

  deleteEvent: (id) => {
    set((state) => {
      const newMap = new Map(state.eventMap);
      newMap.delete(id);
      
      return {
        events: state.events.filter((e) => e.id !== id),
        eventMap: newMap,
        activeEventId: state.activeEventId === id ? null : state.activeEventId,
      };
    });
  },

  setActiveEventId: (id) => set({ activeEventId: id }),

  getEventById: (id) => get().eventMap.get(id),

  getEventsForDate: (date) => {
    return get().events.filter((event) => {
      return isDateInRange(date, event.startDate, event.endDate);
    });
  },

  getEventsForRange: (startDate, endDate) => {
    return get().events.filter((event) => {
      // Event overlaps with range if:
      // event starts before range ends AND event ends after range starts
      return event.startDate <= endDate && event.endDate >= startDate;
    });
  },
}));
