import './Home.css';
import { useEffect, useState } from 'react';
import { fetchMovieData } from '../../utilities/fetch';
import Navbar from '../../components/navbar/Navbar';
import TrendingCarousel from '../../components/trendingCarousel/TrendingCarousel';
import MovieCarousel from '../../components/movieCarousel/MovieCarousel';

export const Home = () => {
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [remaining, setRemaining] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data: Movie[] = await fetchMovieData();

        if (data.length > 0) {
          const trendingMovies = randomSelectionMovies(data, 8);
          setTrending(trendingMovies);

          const filteredMovies = remainingMovies(trendingMovies, data);

          const recommendedMovies = randomSelectionMovies(filteredMovies, 8);
          setRecommended(recommendedMovies);

          const remaining = remainingMovies(
            [...trendingMovies, ...recommendedMovies],
            data
          );
          setRemaining(remaining);
        } else {
          setError('Failed to fetch movies.');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const remainingMovies = (selectedMovies: Movie[], allMovies: Movie[]) => {
    return allMovies.filter(movieData => {
      return !selectedMovies.some(movie => movie.title === movieData.title);
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
      <Navbar />
      <main>
        <TrendingCarousel movies={trending} />
        <MovieCarousel movies={recommended} title="Recommended" />
        <MovieCarousel movies={remaining} title="Movies" />
      </main>
    </>
  );
};
