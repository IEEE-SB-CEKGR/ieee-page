'use client';

import Social from '@/app/ui/home/Social';
import Stats from '@/app/ui/home/Stats';
import '@/app/ui/global.css';
import Carousel from './ui/home/Carousel';
import BgAnimation from './ui/home/bgAnimation';

const images = [
  '/globe/home1.jpg',
  '/globe/home2.jpg',
  '/globe/home3.jpg',
  '/globe/home4.jpg',
];

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Page() {
  return (
    <section className="min-h-screen w-full">
      <div>
        <BgAnimation />
      </div>
      <div className="mx-auto p-4 sm:p-10">
        <div>
          <div className="flex flex-col items-center justify-center xl:flex-row xl:justify-between xl:pb-24 xl:pt-8">
            {/* text */}
            <div className="order-2 text-center sm:mt-10 xl:order-none xl:text-left">
              <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                COLLEGE OF ENGINEERING KIDANGOOR
                <br />
                <br />
                <span className="font-bold text-accent">IEEE SB CE KGR</span>
              </h1>
              <p className="mb-9 max-w-[700px] text-white/80 sm:w-screen">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              {/* Buttons and Socials */}
              <div className="flex flex-col items-center gap-8 xl:flex-row">
                <div className="mb-8 xl:mb-0">
                  <Social
                    containerStyles="flex gap-6"
                    iconsStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            {/* photo */}
            <div className="order-1 mb-10 xl:order-none xl:mb-0">
              <Carousel slides={SLIDES} options={OPTIONS} />
            </div>
            <div></div>
          </div>
        </div>
        <Stats />
      </div>
    </section>
  );
}
