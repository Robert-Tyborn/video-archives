import { useEffect, useState } from 'react';
import './Home.css';
import { MovieDisplay } from '../../components/movieDisplay/MovieDisplay';
import { fetchMovieData } from '../../utilities/fetch';
import Navbar from '../../components/navbar/Navbar';

export const Home = () => {
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const data: Movie[] = await fetchMovieData();

        if (data.length > 0) {
          const trendingMovies = randomSelectionMovies(data, 8);
          console.log(trendingMovies);

          setTrending(trendingMovies);

          const filteredMovies = remainingMovies(trendingMovies, data);
          const recommendedMovies = randomSelectionMovies(filteredMovies, 8);
          console.log(recommendedMovies);

          setRecommended(recommendedMovies);
        } else {
          setError('Failed to fetch movies.');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const remainingMovies = (trendingMovies: Movie[], allMovies: Movie[]) => {
    return allMovies.filter(movieData => {
      return !trendingMovies.some(movie => movie.title === movieData.title);
    });
  };

  const randomSelectionMovies = (movies: Movie[], count: number) => {
    const randomIndices: number[] = [];

    while (randomIndices.length < count) {
      const randomNum = Math.floor(Math.random() * movies.length);
      if (!randomIndices.includes(randomNum)) {
        randomIndices.push(randomNum);
      }
    }
    const selectedMovies = randomIndices.map(index => movies[index]);
    return selectedMovies;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section>
          <MovieDisplay movies={trending} title="Trending" size="large"/>
        </section>
        <section>
          <MovieDisplay movies={recommended} title="Recommended" size="small"/>
        </section>
      </main>
    </>
  );
};
