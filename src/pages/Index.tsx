import { CalendarView } from '@/components/Calendar/CalendarView';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Calendar View</h1>
        <div className="h-[calc(100vh-120px)] border border-border rounded-lg overflow-hidden shadow-lg">
          <CalendarView />
        </div>
      </div>
    </div>
  );
};

export default Index;
