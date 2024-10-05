'use client';

import { useEffect } from 'react';
import CountUp from 'react-countup';
import { fetchStats } from '@/app/lib/actions';
import { date } from 'zod';

const stats = [
  { number: 30, text: 'Events Hosted' },
  { number: 20, text: 'Student Members' },
  { number: 20, text: 'Execom Members' },
];

const Stats = () => {
  useEffect(() => {
    const fetchStatsData = async () => {
      const data = await fetchStats();
      console.log('Stats data : ', data);
    };

    fetchStatsData();
  }, []);

  return (
    <section className="container">
      <div className="container mx-auto px-0">
        <div className="mx-auto flex max-w-[80vw] flex-wrap gap-6 xl:max-w-none">
          {stats.map(
            (item: { number: number; text: string }, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-1 items-center justify-center gap-4 xl:justify-start"
                >
                  <CountUp
                    end={item.number}
                    duration={5}
                    delay={2}
                    className="text-4xl font-extrabold text-white xl:text-6xl"
                  />
                  <p
                    className={`${item.text.length < 16 ? 'max-w-[100px]' : 'max-w-[150px]'} leading-snug text-white/80`}
                  >
                    {item.text}
                  </p>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default Stats;
