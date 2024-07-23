'use client';
// src/components/RotatingCylinder.tsx
import * as React from 'react';
import { Carousel, CarouselItem, CarouselRef } from 'react-round-carousel';
import './cylinder.css';

const images = [
  '/globe/home1.jpg',
  '/globe/home2.jpg',
  '/globe/home3.jpg',
  '/globe/home4.jpg',
  '/globe/home4.jpg',
  '/globe/home4.jpg',
  '/globe/home4.jpg',
  '/globe/home4.jpg',
  '/globe/home4.jpg',
  '/globe/home4.jpg',
];

/* Create an array of Carousel Items
const items: CarouselItem[] = images
  .fill('')
  .map((_: string, index: number) => ({
    alt: 'A random photo',
    image: `https://picsum.photos/${210 + index}`,
    content: (
      <div>
        <strong>Round Carousel</strong>
  
      <span>Slide number {index + 1}</span>
      </div>
    ),
  }));
*/

const RotatingCylinder: React.FC = () => {
  const carouselRef = React.createRef<CarouselRef>();
  const [enlargedIndex, setEnlargedIndex] = React.useState<number | null>(null);

  const items: CarouselItem[] = images.map((image, index) => ({
    alt: `Slide ${index + 1}`,
    image: image,
    content: (
      <div>
        <strong>Round Carousel</strong>

        <span>Slide number {index + 1}</span>
      </div>
    ),
  }));

  return (
    <div className="">
      <Carousel ref={carouselRef} items={items} slideOnClick />
    </div>
  );
};

export default RotatingCylinder;
