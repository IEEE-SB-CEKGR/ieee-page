'use client';

import CountUp from 'react-countup';

const stats = [
  { number: 30, text: 'Events Hosted' },
  { number: 8, text: 'Student Members' },
  { number: 10, text: 'Execom Members' },
];

const Stats = () => {
  return (
    <section className="pb-12 pt-4 xl:pb-0 xl:pt-0">
      <div className="container mx-auto">
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
                    className={`${item.text.length < 15 ? 'max-w-[100px]' : 'max-w-[150px]'} leading-snug text-white/80`}
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
