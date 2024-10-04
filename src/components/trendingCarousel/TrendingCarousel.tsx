import Slider from 'react-slick';
import './TrendingCarousel.css';

// Custom Next Arrow Button
const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next-arrow`} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        height="50px"
        width="50px"
        viewBox="0 0 330 330"
      >
        <path
          d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  
            c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394
            c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330
            s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
            C255,161.018,253.42,157.202,250.606,154.389z"
        />
      </svg>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev-arrow`} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        height="50px"
        width="50px"
        viewBox="0 0 330 330"
        style={{ transform: 'rotate(180deg)' }}
      >
        <path
          d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  
            c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394
            c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330
            s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
            C255,161.018,253.42,157.202,250.606,154.389z"
        />
      </svg>
    </div>
  );
};

interface Movie {
  title: string;
  thumbnail: string;
}

interface TrendingCarouselProps {
  movies: Movie[];
}

export default function TrendingCarousel({ movies }: TrendingCarouselProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: true,
  };

  return (
    <div className="trendingContainer">
      <h1>Trending</h1>
      <div className="sliderWrapper">
        <Slider {...settings}>
          {movies.map(movie => (
            <div
              key={movie.title}
              className="movieCard"
              data-testid="movieCard"
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="trendingThumbnail"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
