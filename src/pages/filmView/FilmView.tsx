import { useEffect } from 'react';
import './FilmView.css';
import { useLocation } from 'react-router-dom';
import { fetchMovieData } from '../../utilities/fetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.thumbnail} alt={movie.title} />
      <p>{`Released: ${movie.year}`}</p>
      <p>{`Rating: ${movie.rating}`}</p>
      <p>{`Genre: ${movie.genre}`}</p>
      <p>{`Actors: ${movie.actors}`}</p>
      <p>{`Description: ${movie.synopsis}`}</p>
    </div>
  );
}

export default FilmView;
