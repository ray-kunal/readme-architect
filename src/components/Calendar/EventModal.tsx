import { useState, useEffect } from 'react';
import { Modal } from '@/components/primitives/Modal';
import { Button } from '@/components/primitives/Button';
import { useEventManager, CalendarEvent } from '@/hooks/useEventManager';
import { EVENT_COLORS, validateEvent } from '@/utils/event.utils';
import { formatDate } from '@/utils/date.utils';
import { clsx } from 'clsx';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId?: string | null;
  defaultDate?: Date;
}

export const EventModal = ({ isOpen, onClose, eventId, defaultDate }: EventModalProps) => {
  const getEventById = useEventManager((state) => state.getEventById);
  const addEvent = useEventManager((state) => state.addEvent);
  const updateEvent = useEventManager((state) => state.updateEvent);
  const deleteEvent = useEventManager((state) => state.deleteEvent);

  const existingEvent = eventId ? getEventById(eventId) : null;
  const isEditing = !!existingEvent;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('10:00');
  const [color, setColor] = useState(EVENT_COLORS[0]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (existingEvent) {
        setTitle(existingEvent.title);
        setDescription(existingEvent.description || '');
        setStartDate(formatDate(existingEvent.startDate, 'yyyy-MM-dd'));
        setStartTime(formatDate(existingEvent.startDate, 'HH:mm'));
        setEndDate(formatDate(existingEvent.endDate, 'yyyy-MM-dd'));
        setEndTime(formatDate(existingEvent.endDate, 'HH:mm'));
        setColor(existingEvent.color);
      } else {
        const date = defaultDate || new Date();
        const dateStr = formatDate(date, 'yyyy-MM-dd');
        setTitle('');
        setDescription('');
        setStartDate(dateStr);
        setStartTime('09:00');
        setEndDate(dateStr);
        setEndTime('10:00');
        setColor(EVENT_COLORS[0]);
      }
      setErrors([]);
    }
  }, [isOpen, existingEvent, defaultDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    const validation = validateEvent(title, start, end);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    if (isEditing && eventId) {
      updateEvent(eventId, {
        title,
        description,
        startDate: start,
        endDate: end,
        color,
      });
    } else {
      addEvent({
        title,
        description,
        startDate: start,
        endDate: end,
        color,
      });
    }

    onClose();
  };

  const handleDelete = () => {
    if (eventId && window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Event' : 'Create Event'}
      className="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.length > 0 && (
          <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded p-3 text-sm">
            <ul className="list-disc list-inside">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-foreground">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Event title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-foreground">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="Event description (optional)"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-1 text-foreground">
              Start Date *
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label htmlFor="startTime" className="block text-sm font-medium mb-1 text-foreground">
              Start Time *
            </label>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-1 text-foreground">
              End Date *
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium mb-1 text-foreground">
              End Time *
            </label>
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">Color</label>
          <div className="flex flex-wrap gap-2">
            {EVENT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={clsx(
                  'w-8 h-8 rounded-full transition-transform',
                  color === c ? 'ring-2 ring-offset-2 ring-ring scale-110' : 'hover:scale-110'
                )}
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-2 pt-4">
          {isEditing && (
            <Button type="button" variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
