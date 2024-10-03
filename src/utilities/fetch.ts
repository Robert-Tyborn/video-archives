export async function fetchMovieData() {
  try {
    const response = await fetch(`/video-archives/data/movies.json`);
    console.log(response);

    if (!response.ok) {
      throw new Error('Response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
