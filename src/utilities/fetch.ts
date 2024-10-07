export async function fetchMovieData() {
  try {
    const response = await fetch(`/video-archives/data/movies.json`);

    if (!response.ok) {
      throw new Error('Response was not ok');
    }
    const data = await response.json();
    return data as Movie[];
  } catch (error) {
    console.error(error);
    return [] as Movie[];
  }
}
