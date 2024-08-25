'use client';

import Image from 'next/image';

const EventCard = (data: any) => {
  return (
    <div className="bg-dark mem-border-color w-full max-w-xs transform rounded-lg border shadow transition duration-300 ease-in-out motion-safe:hover:scale-105 dark:bg-gray-800 sm:max-w-sm">
      <a className="block cursor-pointer">
        <div className="relative w-full overflow-hidden rounded-t-lg">
          <Image
            className="object-cover"
            src={data.event.image_url}
            alt="product image"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>
      </a>
      <div className="px-5 pb-5 sm:px-10">
        <a href="#">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
            {data.event.name}
          </h5>
        </a>
        <a href="#">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
            {data.event.date}
          </h5>
        </a>
        <a href="#">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
            {data.event.time}
          </h5>
        </a>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white sm:text-3xl">
            {data.event.fee == 0 ? 'Free' : `₹ ${data.event.fee}`}
          </span>
          <a
            href={data.event.link}
            className="rounded-lg bg-blue-700 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
