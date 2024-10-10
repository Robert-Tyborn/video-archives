import { useEffect } from 'react';
import './FilmView.css';
import { useLocation } from 'react-router-dom';
import { fetchMovieData } from '../../utilities/fetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bookmark from '../../components/bookMark/BookMark';
import closeIcon from '../../assets/icons8-close-50.png';

function FilmView() {
  const location = useLocation();
  const navigate = useNavigate();
  //splittar urlen och tar bort det sista för att sen kunna hitta den titeln.
  const [movie, setMovie] = useState<Movie | null>(location.state || null);
  const pathname = location.pathname.split('/');
  const title = decodeURIComponent(pathname[pathname.length - 1]);

  useEffect(() => {
    if (movie) return;

    const fetchMovie = async () => {
      try {
        const movies = await fetchMovieData();
        console.log('fetched movies:', movies);
        const foundMovie = movies.find(d => d.title === title);
        if (foundMovie) {
          setMovie(foundMovie); // Sätt filmdata i state
        } else {
          // Navigera tillbaka om ingen film hittas
          navigate('/video-archives/');
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovie();
  }, [title, movie, navigate]);

  if (!movie) {
    return <p>Loading movie data...</p>;
  }

  function handleIconClick() {
    navigate('/video-archives/');
  }

  return (
    <div
      className="film-container"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1)), url(${movie.thumbnail})`,
      }}
    >
      <header className="closeIconHeader">
        <div className="closeIcon" onClick={handleIconClick}>
          <img className="icon" src={closeIcon} alt="" />
        </div>
      </header>
      <section className="film-content">
        <section className="titleAndBookmark">
          <h1 className="film-title">{movie.title}</h1>
          <div className="thumbnail-container">
            <Bookmark movie={movie} />
          </div>
        </section>
        <section className="film-detailsWrapper">
          <p className="film-details">{`Released: ${movie.year}`}</p>
          <p className="film-details">{`Rating: ${movie.rating}`}</p>
          <p className="film-details">{`Genre: ${movie.genre}`}</p>
          <p className="film-details">{`Actors: ${movie.actors}`}</p>
        </section>
        <p className="film-synopsis">{`${movie.synopsis}`}</p>
      </section>
    </div>
  );
}

export default FilmView;
