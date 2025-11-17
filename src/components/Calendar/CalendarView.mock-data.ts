import { CalendarEvent } from '@/hooks/useEventManager';
import { EVENT_COLORS } from '@/utils/event.utils';

// Helper function to create a date relative to today
const createDate = (daysFromToday: number, hours: number = 9, minutes: number = 0): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Sample events for Default story (3-4 events)
export const defaultEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Team Meeting',
    description: 'Weekly team sync to discuss project progress',
    startDate: createDate(1, 10, 0),
    endDate: createDate(1, 11, 0),
    color: EVENT_COLORS[0], // blue
  },
  {
    id: 'event-2',
    title: 'Project Deadline',
    description: 'Submit final deliverables for Q4 project',
    startDate: createDate(3, 14, 0),
    endDate: createDate(3, 17, 0),
    color: EVENT_COLORS[1], // red
  },
  {
    id: 'event-3',
    title: 'Client Presentation',
    description: 'Present project updates to client stakeholders',
    startDate: createDate(5, 15, 30),
    endDate: createDate(5, 16, 30),
    color: EVENT_COLORS[2], // green
  },
  {
    id: 'event-4',
    title: 'Code Review',
    description: 'Review and discuss recent code changes',
    startDate: createDate(-2, 13, 0),
    endDate: createDate(-2, 14, 30),
    color: EVENT_COLORS[3], // amber
  },
];

// Week view events with overlapping times
export const weekViewEvents: CalendarEvent[] = [
  {
    id: 'week-event-1',
    title: 'Morning Standup',
    description: 'Daily team standup meeting',
    startDate: createDate(0, 9, 0),
    endDate: createDate(0, 9, 30),
    color: EVENT_COLORS[0],
  },
  {
    id: 'week-event-2',
    title: 'Workshop',
    description: 'Technical workshop on new technologies',
    startDate: createDate(0, 9, 15), // Overlapping with standup
    endDate: createDate(0, 11, 0),
    color: EVENT_COLORS[4],
  },
  {
    id: 'week-event-3',
    title: 'Lunch Meeting',
    description: 'Business lunch with potential clients',
    startDate: createDate(1, 12, 0),
    endDate: createDate(1, 13, 30),
    color: EVENT_COLORS[2],
  },
];

// Large dataset with 20+ events
export const largeDatasetEvents: CalendarEvent[] = [
  // Week 1
  {
    id: 'large-1',
    title: 'Project Kickoff',
    startDate: createDate(-7, 9, 0),
    endDate: createDate(-7, 10, 30),
    color: EVENT_COLORS[0],
  },
  {
    id: 'large-2',
    title: 'Requirements Gathering',
    startDate: createDate(-6, 14, 0),
    endDate: createDate(-6, 16, 0),
    color: EVENT_COLORS[1],
  },
  {
    id: 'large-3',
    title: 'Design Review',
    startDate: createDate(-5, 10, 0),
    endDate: createDate(-5, 11, 30),
    color: EVENT_COLORS[2],
  },
  {
    id: 'large-4',
    title: 'Sprint Planning',
    startDate: createDate(-4, 9, 0),
    endDate: createDate(-4, 12, 0),
    color: EVENT_COLORS[3],
  },
  {
    id: 'large-5',
    title: 'Development Start',
    startDate: createDate(-3, 8, 0),
    endDate: createDate(-3, 17, 0),
    color: EVENT_COLORS[4],
  },
  
  // Current week
  {
    id: 'large-6',
    title: 'Daily Standup',
    startDate: createDate(0, 9, 0),
    endDate: createDate(0, 9, 30),
    color: EVENT_COLORS[5],
  },
  {
    id: 'large-7',
    title: 'Code Review Session',
    startDate: createDate(0, 11, 0),
    endDate: createDate(0, 12, 0),
    color: EVENT_COLORS[6],
  },
  {
    id: 'large-8',
    title: 'Client Demo',
    startDate: createDate(1, 15, 0),
    endDate: createDate(1, 16, 0),
    color: EVENT_COLORS[7],
  },
  {
    id: 'large-9',
    title: 'Team Building',
    startDate: createDate(2, 17, 0),
    endDate: createDate(2, 20, 0),
    color: EVENT_COLORS[0],
  },
  {
    id: 'large-10',
    title: 'Technical Deep Dive',
    startDate: createDate(3, 10, 0),
    endDate: createDate(3, 12, 0),
    color: EVENT_COLORS[1],
  },
  {
    id: 'large-11',
    title: 'Bug Triage',
    startDate: createDate(4, 13, 0),
    endDate: createDate(4, 14, 30),
    color: EVENT_COLORS[2],
  },
  
  // Next week
  {
    id: 'large-12',
    title: 'Architecture Review',
    startDate: createDate(7, 9, 0),
    endDate: createDate(7, 11, 0),
    color: EVENT_COLORS[3],
  },
  {
    id: 'large-13',
    title: 'Performance Testing',
    startDate: createDate(8, 13, 0),
    endDate: createDate(8, 17, 0),
    color: EVENT_COLORS[4],
  },
  {
    id: 'large-14',
    title: 'User Testing',
    startDate: createDate(9, 10, 0),
    endDate: createDate(9, 15, 0),
    color: EVENT_COLORS[5],
  },
  {
    id: 'large-15',
    title: 'Documentation Review',
    startDate: createDate(10, 9, 0),
    endDate: createDate(10, 10, 0),
    color: EVENT_COLORS[6],
  },
  {
    id: 'large-16',
    title: 'Security Audit',
    startDate: createDate(11, 14, 0),
    endDate: createDate(11, 16, 0),
    color: EVENT_COLORS[7],
  },
  {
    id: 'large-17',
    title: 'Deploy Preparation',
    startDate: createDate(12, 11, 0),
    endDate: createDate(12, 13, 0),
    color: EVENT_COLORS[0],
  },
  {
    id: 'large-18',
    title: 'Production Deploy',
    startDate: createDate(13, 16, 0),
    endDate: createDate(13, 18, 0),
    color: EVENT_COLORS[1],
  },
  {
    id: 'large-19',
    title: 'Post-Deploy Testing',
    startDate: createDate(14, 9, 0),
    endDate: createDate(14, 12, 0),
    color: EVENT_COLORS[2],
  },
  {
    id: 'large-20',
    title: 'Retrospective',
    startDate: createDate(14, 15, 0),
    endDate: createDate(14, 16, 30),
    color: EVENT_COLORS[3],
  },
  {
    id: 'large-21',
    title: 'Celebration Party',
    startDate: createDate(15, 18, 0),
    endDate: createDate(15, 22, 0),
    color: EVENT_COLORS[4],
  },
];

// Empty events array
export const emptyEvents: CalendarEvent[] = [];