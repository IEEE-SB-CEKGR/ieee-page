'use client';
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

const RotatingCylinder: React.FC = () => {
  const carouselRef = React.createRef<CarouselRef>();

  const preventDefaultTouchBehavior = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

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
    <div
      className="carousel"
      onTouchStart={preventDefaultTouchBehavior}
      onTouchMove={preventDefaultTouchBehavior}
      onTouchEnd={preventDefaultTouchBehavior}
    >
      <Carousel ref={carouselRef} items={items} slideOnClick />
    </div>
  );
};

export default RotatingCylinder;
