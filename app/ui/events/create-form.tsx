'use client';

import Link from 'next/link';
import { createEvent } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { Datepicker } from 'flowbite-react';
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createEvent, initialState);
  const [image, setImage] = useState(null);

  const imageChange = (e: any) => {
    if (e.target.files.length > 0 && e.target.files)
      setImage(e.target.files[0]);
  };

  const cancelImage = () => {
    setImage(null);
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* file upload */}
        <div className="mb-4">
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Upload file
          </label>
          <div className="w-50 flex items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
            >
              {image && (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="h-64 w-full object-cover"
                  width={300}
                  height={400}
                />
              )}

              {image ? (
                <></>
              ) : (
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={imageChange}
                name="image"
              />
            </label>
          </div>

          {image ? (
            <button
              type="button"
              className="mb-2 me-2 mt-3 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={cancelImage}
            >
              Cancel
            </button>
          ) : null}
        </div>
        {/*  Event name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Event Name
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Enter event name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* date */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Date</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative max-w-sm">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <Datepicker name="date" />
            </div>
          </div>
        </div>
        {/* time */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Time
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="time"
                name="time"
                type="string"
                placeholder="Enter the time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* mode */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Mode of event
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="mode"
                name="mode"
                type="string"
                placeholder="Enter the mode of event"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Registration Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Registration Amount
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Venue*/}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Venue
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="venue"
                name="venue"
                type="string"
                placeholder="Enter venue"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Registration Link */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Google Form Link
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="link"
                name="gformlink"
                type="string"
                placeholder="Enter Google Form Link"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Event Description
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <textarea
                id="message"
                rows={4}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Write above event..."
                name="description"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Event Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the event status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="not-hosted"
                  name="status"
                  type="radio"
                  value="not"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="not"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Not Hosted <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Hosted"
                  name="status"
                  type="radio"
                  value="hosted"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Hosted"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Hosted <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  );
}
