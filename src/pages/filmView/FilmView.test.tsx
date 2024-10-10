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
