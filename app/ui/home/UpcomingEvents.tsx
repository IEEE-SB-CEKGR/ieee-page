'use client';
import { useState, useEffect, Suspense } from 'react';
import { fetchUpcomingEventsAction } from '@/app/lib/actions';
import EventCard from '@/app/ui/home/EventsCard';
import EventModal from '@/app/ui/home/EventModal';
import { EventSkeleton } from '../skeletons';

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchUpcomingEventsAction();
      console.log('upcoming data : ', data);
      if (data) {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="p-10 text-2xl font-medium text-white">
        Upcoming Events
      </span>
      <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4 xl:gap-10">
        {events.length > 0 ? (
          events.map((event: any) => (
            <Suspense key={event.id} fallback={'Loading'}>
              <div
                key={event.id}
                className="cursor-pointer"
                style={{
                  flexBasis: '100%',
                  maxWidth: 'calc(100% / 2 - 2rem)',
                  aspectRatio: '1/1',
                }}
                onClick={() => handleEventClick(event)}
              >
                <EventCard event={event} />
              </div>
            </Suspense>
          ))
        ) : (
          <span className="text-white">No Upcoming Events</span>
        )}
      </div>
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
}
