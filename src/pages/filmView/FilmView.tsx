import { useEffect } from 'react';
import './FilmView.css';
import { useLocation } from 'react-router-dom';
import { fetchMovieData } from '../../utilities/fetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bookmark from '../../components/bookMark/BookMark';
import closeIcon from '../../assets/icons8-close-50.png';
import Navbar from '../../components/navbar/Navbar';

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
    <>
      <Navbar />
      <header className="closeIconHeader">
        <div className="closeIcon" onClick={handleIconClick}>
          <img className="icon" src={closeIcon} alt="" />
        </div>
      </header>
      <div
        className="film-container"
        style={{
          backgroundImage: `url(${movie.thumbnail})`,
        }}
      >
        <section className="film-content">
          <section className="titleAndBookmark">
            <h1 className="film-title">{movie.title}</h1>
            <div className="thumbnail-container">
              <Bookmark movie={movie} />
            </div>
          </section>
          <section className="film-detailsWrapper">
            <article>
              <div className="information">
                <div>
                  <p className="film-details">{`Released: ${movie.year}`}</p>
                  <p className="film-details">{`Genre: ${movie.genre}`}</p>
                </div>
                <div>
                  <p className="film-details">{`Rating: ${movie.rating}`}</p>
                  <p className="film-details">{`Actors: ${movie.actors}`}</p>
                </div>
              </div>
            </article>
            <article>
              <p className="film-synopsis">{`${movie.synopsis}`}</p>
            </article>
          </section>
        </section>
      </div>
    </>
  );
}

export default FilmView;
