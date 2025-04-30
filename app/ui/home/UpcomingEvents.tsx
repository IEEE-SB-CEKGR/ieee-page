'use client';
import { useState, useEffect, Suspense } from 'react';
import { fetchUpcomingEventsAction } from '@/app/lib/actions';
import EventCard from '@/app/ui/home/EventsCard';
import EventModal from '@/app/ui/home/EventModal';
import { UpcomingEventsSkeleton } from '../skeletons';

interface Event {
  date: string;
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
  mode: string;
  venue: string;
  fee: string;
  description: string;
  link: string;
  time: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchUpcomingEventsAction();

      if (data) {
        setEvents(data);
        setIsLoading(false); // Set loading to false once events are fetched
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="w-full">
      <h3 className="mt-10 text-center text-2xl font-bold text-white">
        Upcoming Events
      </h3>
      <div className="flex flex-col items-center justify-center">
        {/* Container for the event cards with fixed height and scrollable content */}
        <div className="relative flex h-[80vh] w-full flex-wrap justify-center gap-4 overflow-y-auto scroll-smooth p-4 sm:gap-10 sm:p-10">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <UpcomingEventsSkeleton key={index} />
              ))
            : events.map((event: any) => (
                <Suspense key={event.id} fallback={<UpcomingEventsSkeleton />}>
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="animate-fade-in opacity-0 transition-opacity duration-500 ease-in-out"
                  >
                    <EventCard event={event} />
                  </div>
                </Suspense>
              ))}
        </div>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
