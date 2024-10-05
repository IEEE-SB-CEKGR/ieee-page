'use client';

import Image from 'next/image';

const EventCard = (data: any) => {
  return (
    <div className="bg-dark mem-border-color w-full max-w-sm transform rounded-lg border shadow transition  duration-300 ease-in-out motion-safe:hover:scale-105 ">
      <a className="cursor-pointer">
        <Image
          className="rounded-t-lg p-8"
          src={data.event.image_url}
          alt="product image"
          width={400}
          height={400}
        />
      </a>
      <div className="px-10 pb-5">
        <a href="#">
          <h5 className="mb-4 text-xl font-semibold tracking-tight text-white">
            {data.event.name}
          </h5>
        </a>
        <a href="#">
          <h5 className="mb-4 text-xl font-semibold tracking-tight text-white">
            {data.event.date}
          </h5>
        </a>
        <a href="#">
          <h5 className="mb-4 text-xl font-semibold tracking-tight text-white">
            {data.event.time}
          </h5>
        </a>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-white">
            {data.event.fee == 0 ? 'Free' : `₹ ${data.event.fee}`}
          </span>
          <a
            href={data.event.link}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
