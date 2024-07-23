import Social from '@/app/ui/home/Social';
import Stats from '@/app/ui/home/Stats';
import Header from './ui/home/Header';
import RotatingCylinder from './ui/home/Cylinder';
import '@/app/ui/global.css';

const images = [
  '/globe/home1.jpg',
  '/globe/home2.jpg',
  '/globe/home3.jpg',
  '/globe/home4.jpg',
];

export default function Page() {
  return (
    <section className="h-full w-full bg-[#1c1c22] sm:w-screen">
      <Header />
      <div className="mx-auto h-full p-10">
        <div>
          <div className="flex w-full flex-col items-center justify-between xl:flex-row xl:pb-24 xl:pt-8">
            {/*text*/}
            <div className="order-2 text-center sm:mt-10 xl:order-none xl:text-left">
              <h1 className="h3 mb-6 text-white">
                COLLEGE OF ENGINEERING KIDANGOOR
                <br />
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
            <RotatingCylinder images={images} />
            <div className=""></div>
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
}
