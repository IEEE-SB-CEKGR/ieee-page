import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from './ui/fonts';
import Image from 'next/image';

import { Button } from '@/app/ui/home/ui/button';
import { FiDownload } from 'react-icons/fi';
import Social from '@/app/ui/home/Social';
import Photo from '@/app/ui/home/Photo';
import Stats from '@/app/ui/home/Stats';
import Header from './ui/home/Header';

export default function Page() {
  return (
    <section className="h-full bg-[#1c1c22]">
      <Header />
      <div className="container mx-auto h-full">
        <div>
          <div className="flex flex-col items-center justify-between xl:flex-row xl:pb-24 xl:pt-8">
            {/*text*/}
            <div className="order-2 text-center xl:order-none xl:text-left">
              <h1 className="h1 mb-6 text-white">
                Welcome to
                <br />
                <span className="text-accent">IEEE CEK SB</span>
              </h1>
              <p className="mb-9 max-w-[500px] text-white/80">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              {/*Buttons and Socials*/}
              <div className="flex flex-col items-center gap-8 xl:flex-row">
                <div className="mb-8 xl:mb-0">
                  <Social
                    containerStyles="flex gap-6"
                    iconsStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            {/*photo*/}
            <div className="order-1 mb-8 xl:order-none xl:mb-0">
              <Photo />
            </div>
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
}
