// src/components/landingPage/ImageSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1693925380807-81be3d1d7105?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Tractor in the field',
    title: 'Modern Tractors',
    caption: 'Empowering farmers with the latest machinery.'
  },
  {
    src: 'https://images.unsplash.com/photo-1598291234998-8f09be2ac4d9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Fishermen at dawn',
    title: 'Fisherman Community',
    caption: 'Supporting coastal livelihoods and techniques.'
  },
  {
    src: 'https://images.unsplash.com/photo-1702396303435-76dd4dd12ce4?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Harvesting honeycombs',
    title: 'Honey Harvest',
    caption: 'Celebrating the sweet fruits of beekeeping.'
  },
  {
    src: 'https://images.unsplash.com/photo-1688296415469-19766056300e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Grazing cows',
    title: 'Livestock Care',
    caption: 'Ensuring healthy cattle management.'
  },
  {
    src: 'https://images.unsplash.com/photo-1622123651884-e3d30eebfbff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Farmers working together',
    title: 'Community Farming',
    caption: 'Uniting hands to grow sustainable harvests.'
  }
];

export default function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '15%', // ~70% width
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 sm:px-10 lg:px-28">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Our Field in Action
        </h2>
        <Slider {...settings}>
          {slides.map((slide, i) => (
            <div key={i} className="px-2">
              <div className="slide-content relative">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
                <div
                  className="
                    absolute bottom-4 left-4 
                    bg-black bg-opacity-50 text-white 
                    p-4 rounded-md max-w-xs
                    opacity-0 transition-opacity duration-700
                    slide-content-overlay
                  "
                >
                  <h3 className="text-xl font-semibold">{slide.title}</h3>
                  <p className="text-sm mt-1">{slide.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
