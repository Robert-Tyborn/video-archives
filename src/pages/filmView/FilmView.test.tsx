// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { act, render, screen } from '@testing-library/react';
// import { describe, expect, it } from 'vitest';
// import FilmView from './FilmView';
// import { fetchMovieData } from '../../utilities/fetch';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';

// vi.mock('../../utilities/fetch', () => ({
//   fetchMovieData: vi.fn(),
// }));

// const mockMovie = {
//   title: 'Inception',
//   year: 2010,
//   rating: '8.8',
//   genre: 'Sci-Fi',
//   actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
//   synopsis: 'A thief who steals corporate secrets...',
//   thumbnail: 'mock-thumbnail-url.jpg',
// };

// describe('FilmView Component', () => {
//   it('renders the FilmView component and displays movie information', async () => {
//     (fetchMovieData as any).mockResolvedValue([mockMovie]);

//     await act(async () => {
//       render(
//         <MemoryRouter initialEntries={[{ pathname: `/film/Inception`, state: { movie: mockMovie } }]}>
//           <Routes>
//             <Route path="/film/:title" element={<FilmView />} />
//           </Routes>
//         </MemoryRouter>
//       );
//     });

//     screen.debug();

//     expect(await screen.findByText('Inception')).toBeInTheDocument();
//     expect(await screen.findByText('Released: 2010')).toBeInTheDocument();
//     expect(await screen.findByText('Rating: 8.8')).toBeInTheDocument();
//     expect(await screen.findByText('Genre: Sci-Fi')).toBeInTheDocument();
//     expect(await screen.findByText('Actors: Leonardo DiCaprio, Joseph Gordon-Levitt')).toBeInTheDocument();
//     expect(await screen.findByText('A thief who steals corporate secrets')).toBeInTheDocument();

//   });
// });
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import MovieCard from '../../components/movieCard/MovieCard';
import FilmView from './FilmView';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    ); // Importera den faktiska modulen
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockMovie = {
  title: 'Inception',
  year: 2010,
  rating: 'PG-13',
  actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
  genre: 'Action, Adventure, Sci-Fi',
  synopsis:
    'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
  thumbnail:
    'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
};

describe('MovieCard Component', () => {
  it('navigates to FilmView with correct movie data on card click', () => {
    const navigateMock = vi.mocked(useNavigate);
    navigateMock.mockReturnValue(vi.fn());

    // Mocka useNavigate
    vi.mocked(useNavigate).mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} size="large" />
      </MemoryRouter>
    );

    // Simulera ett klick på MovieCard
    const movieCard = screen.getByTestId('movieCard');
    fireEvent.click(movieCard);

    // Verifiera att navigeringen sker till korrekt URL
    expect(navigateMock).toHaveBeenCalledWith(
      `/video-archives/filmview/Inception`,
      { state: mockMovie }
    );
  });

  it('renders FilmView with movie data from MovieCard', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/video-archives/filmview/Inception', state: mockMovie },
        ]}
      >
        <Routes>
          <Route
            path="/video-archives/filmview/:title"
            element={<FilmView />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Kontrollera att FilmView renderar korrekt data från MovieCard
    expect(await screen.findByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/Released: 2010/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating: PG-13/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        content => content.includes('Genre') && content.includes('Sci-Fi')
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Leonardo DiCaprio/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A thief who steals corporate secrets/i)
    ).toBeInTheDocument();
  });
});
