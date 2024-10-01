import { useRef } from 'react';
import './Carousel.css';

type CarouselProps = {
  children: React.ReactNode;
};

export const Carousel = ({ children }: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={scrollLeft}>
        <span className="arrow">&#8249;</span>
      </button>

      <div className="carousel-track" ref={containerRef}>
        {children} {}
      </div>

      <button className="carousel-button next" onClick={scrollRight}>
        <span className="arrow">&#8250;</span>
      </button>
    </div>
  );
};
