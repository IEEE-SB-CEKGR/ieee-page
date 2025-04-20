'use client';

import { motion } from 'framer-motion';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gray-800 p-2 shadow-md border border-gray-700"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="flex p-4">
        <motion.div 
          className="h-5 w-5 rounded-md bg-gray-700"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="ml-2 h-6 w-16 rounded-md bg-gray-700 text-sm font-medium"
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-gray-900 px-4 py-8">
        <motion.div 
          className="h-7 w-20 rounded-md bg-gray-700"
          animate={{ opacity: [0.5, 0.7, 0.5], width: ["60%", "70%", "60%"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function EventChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function EventSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function MemberCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-72 h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800 via-gray-850 to-black border border-gray-700 shadow-xl"
    >
      {/* Animated shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent z-10"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />
      
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-cyan-900/5"
        animate={{ 
          opacity: [0.3, 0.15, 0.3] 
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Circular image placeholder with pulse animation */}
      <div className="px-6 pt-8 pb-6 flex flex-col items-center">
        <motion.div 
          className="relative rounded-full mb-6 p-1"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(14, 165, 200, 0)",
              "0 0 0 4px rgba(14, 165, 200, 0.3)",
              "0 0 0 0 rgba(14, 165, 200, 0)"
            ]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <div className="bg-gradient-to-r from-blue-600/30 to-cyan-500/30 p-1 rounded-full">
            <motion.div 
              className="rounded-full overflow-hidden h-40 w-40 bg-gray-800"
              animate={{ 
                backgroundColor: ["#1f2937", "#1a2332", "#1f2937"] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>
        
        {/* Content placeholders with staggered animations */}
        <div className="text-center w-full z-20">
          <motion.div 
            className="h-6 w-32 mx-auto bg-gradient-to-r from-gray-700/80 to-gray-600/80 rounded mb-3"
            animate={{ 
              opacity: [0.7, 0.5, 0.7],
              width: ["60%", "70%", "60%"]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          
          <motion.div 
            className="h-4 w-24 mx-auto bg-gradient-to-r from-blue-800/40 to-cyan-800/40 rounded mb-6"
            animate={{ opacity: [0.6, 0.4, 0.6] }}
            transition={{ 
              duration: 2.5,
              delay: 0.2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          
          <motion.div 
            className="flex justify-center space-x-4 mt-4"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="h-5 w-5 bg-gradient-to-br from-blue-700/30 to-cyan-600/30 rounded-full"
                animate={{ 
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Animated decorative bottom bar */}
      <motion.div 
        className="h-2 mx-auto bg-gradient-to-r from-blue-600/40 to-cyan-400/40 rounded-full"
        initial={{ width: "20%" }}
        animate={{ 
          width: ["30%", "50%", "30%"],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
    </motion.div>
  );
}

export function UpcomingEventsSkeleton() {
  return (
    <div className="bg-dark mem-border-color w-full max-w-sm transform rounded-lg border shadow transition duration-300 ease-in-out">
      <div className="animate-pulse">
        {/* Image Skeleton */}
        <div className="h-64 w-full rounded-t-lg bg-gray-700"></div>

        <div className="px-10 pb-5">
          {/* Title Skeleton */}
          <div className="my-4 h-6 w-3/4 rounded bg-gray-700"></div>
          {/* Date Skeleton */}
          <div className="mb-4 h-4 w-1/2 rounded bg-gray-700"></div>
          {/* Time Skeleton */}
          <div className="mb-4 h-4 w-1/3 rounded bg-gray-700"></div>

          <div className="flex items-center justify-between">
            {/* Fee Skeleton */}
            <div className="h-6 w-20 rounded bg-gray-700"></div>
            {/* Button Skeleton */}
            <div className="h-10 w-24 rounded-lg bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <EventChartSkeleton />
        <EventChartSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
