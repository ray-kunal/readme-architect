import { create } from 'zustand';

export type ViewMode = 'month' | 'week';

interface CalendarState {
  viewMode: ViewMode;
  currentDate: Date;
  selectedDate: Date | null;
  focusedDate: Date | null;
  
  // Actions
  setViewMode: (mode: ViewMode) => void;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  setFocusedDate: (date: Date | null) => void;
  goToToday: () => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
}

export const useCalendar = create<CalendarState>((set) => ({
  viewMode: 'month',
  currentDate: new Date(),
  selectedDate: null,
  focusedDate: null,

  setViewMode: (mode) => set({ viewMode: mode }),
  
  setCurrentDate: (date) => set({ currentDate: date }),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  setFocusedDate: (date) => set({ focusedDate: date }),
  
  goToToday: () => set({ currentDate: new Date() }),
  
  goToPreviousMonth: () => set((state) => {
    const newDate = new Date(state.currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    return { currentDate: newDate };
  }),
  
  goToNextMonth: () => set((state) => {
    const newDate = new Date(state.currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    return { currentDate: newDate };
  }),
  
  goToPreviousWeek: () => set((state) => {
    const newDate = new Date(state.currentDate);
    newDate.setDate(newDate.getDate() - 7);
    return { currentDate: newDate };
  }),
  
  goToNextWeek: () => set((state) => {
    const newDate = new Date(state.currentDate);
    newDate.setDate(newDate.getDate() + 7);
    return { currentDate: newDate };
  }),
}));
