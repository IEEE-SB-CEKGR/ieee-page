'use client';
import { useEffect } from 'react';
import Image from 'next/image';

interface EventModalProps {
  event: any;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex w-full items-center justify-center bg-black"
    >
      <div className="bg-dark  mem-border-color relative w-full max-w-md transform rounded-lg border p-6 text-white shadow-lg transition duration-300 ease-in-out motion-safe:hover:scale-105">
        <button
          type="button"
          onClick={onClose}
          className="bg-dark absolute right-2 top-2 rounded-md p-2  text-red-600 hover:bg-gray-800 hover:text-red-800 focus:text-accent focus:outline-none focus:ring-2 focus:ring-inset"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>{' '}
        <Image
          className="rounded-t-lg p-8"
          src={event.image_url}
          alt="product image"
          width={600}
          height={600}
        />
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
          {event.name}
        </h2>
        <p className="mb-2 text-sm font-semibold tracking-tight text-white">
          <strong>Date:</strong> {event.date}
        </p>
        <p className="mb-2 text-sm font-semibold tracking-tight text-white">
          <strong>Time : </strong> {event.time}
        </p>
        <p className="mb-2 text-sm font-semibold tracking-tight text-white">
          <strong>Venue : </strong> {event.venue}
        </p>
        <p className="mb-2 text-sm font-semibold tracking-tight text-white">
          <strong>Mode : </strong> {event.mode}
        </p>
        <p className="mb-2 text-sm font-semibold tracking-tight text-white">
          <strong>Fee : </strong> {event.fee}
        </p>
        <p className="mb-4 text-sm">
          <strong>Description : </strong> {event.description}
        </p>
        <a
          href={event.link}
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </a>
      </div>
    </div>
  );
}
