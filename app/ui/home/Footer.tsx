'use client';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-dark m-4 rounded-lg text-white shadow dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            className="mb-4 flex items-center space-x-3 rtl:space-x-reverse sm:mb-0"
          >
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
              width={32}
              height={32}
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              Flowbite
            </span>
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-400 dark:text-gray-400 sm:mb-0">
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Execom
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2023{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            IEEE SB CEK KGR
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
