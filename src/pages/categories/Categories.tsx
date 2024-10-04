import { useEffect, useState } from 'react';
import { fetchMovieData } from '../../utilities/fetch';
import './Categories.css';
import Navbar from '../../components/navbar/Navbar';
import { MovieDisplay } from '../../components/movieDisplay/MovieDisplay';

export const Categories = () => {
  const [movieData, setMovieData] = useState<Movie[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | ''>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<Movie[] | null>(null);

  useEffect(() => {
    console.log(activeFilter);
  }, [activeFilter]);

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
          new Set(movieData.flatMap(movie => movie.genre.split(', ')))
        );
        setGenres(uniqueGenres);
      }
    };
    findGenres();
  }, [movieData]);

  useEffect(() => {
    function findMoviesGenre() {
      if (movieData && movieData.length > 0) {
        const activeGenres = activeFilter.split(', ');

        const filteredByGenre = movieData.filter(movie => {
          const movieGenres = movie.genre.split(', ');
          return activeGenres.every(genre => movieGenres.includes(genre));
        });

        console.log(filteredByGenre);
        setMoviesByGenre(filteredByGenre);
      }
    }
    findMoviesGenre();
  }, [activeFilter, movieData]);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, checked } = e.target as HTMLInputElement;

    setActiveFilter(prevValue => {
      if (checked) {
        return prevValue ? `${prevValue}, ${name}` : name;
      } else {
        const updatedFilter = prevValue
          .split(', ')
          .filter(filter => filter !== name)
          .join(', ');

        return updatedFilter;
      }
    });
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
        {moviesByGenre && (
          <section>
            <MovieDisplay
              movies={moviesByGenre}
              title={activeFilter}
              size={'small'}
            />
          </section>
        )}
      </main>
    </>
  );
};
