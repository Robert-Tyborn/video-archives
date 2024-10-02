import { useEffect, useState } from 'react';
import { fetchMovieData } from '../../utilities/fetch';
import './Categories.css';
import Navbar from '../../components/navbar/Navbar';

export const Categories = () => {
  const [movieData, setMovieData] = useState<Movie[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data: Movie[] = await fetchMovieData();
        if (data.length > 0) setMovieData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const findGenres = () => {
      if (movieData) {
        const uniqueGenres = Array.from(
          new Set(
            movieData.flatMap(movie =>
              movie.genre.split(',').map(genre => genre.trim())
            )
          )
        );
        setGenres(uniqueGenres);
      }
    };
    findGenres();
  }, [movieData]);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.target);
    const { name, checked } = e.target as HTMLInputElement;

    if (checked) {
      setActiveFilter(name);
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <fieldset className="seach-by-category">
          <legend>Categories</legend>
          {genres.map(genre => {
            return (
              <div>
                <label htmlFor={genre}>{genre}</label>
                <input
                  type="checkbox"
                  name={genre}
                  id={genre}
                  onClick={handleClick}
                />
              </div>
            );
          })}
        </fieldset>
      </main>
    </>
  );
};
