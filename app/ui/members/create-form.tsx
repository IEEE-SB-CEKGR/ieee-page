'use client';

import Link from 'next/link';
import { createMember } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import Image from 'next/image';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMember, initialState);
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
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Enter member name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* type*/}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Type
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="type"
                name="type"
                type="string"
                placeholder="Enter type"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Role*/}
        <div className="mb-4">
          <label htmlFor="role" className="mb-2 block text-sm font-medium">
            Role
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="role"
                name="role"
                type="string"
                placeholder="Enter role"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Year*/}
        <div className="mb-4">
          <label htmlFor="role" className="mb-2 block text-sm font-medium">
            Year
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="year"
                name="year"
                type="string"
                placeholder="Enter year"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/members"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Member</Button>
      </div>
    </form>
  );
}
