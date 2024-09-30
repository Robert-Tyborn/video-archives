export async function fetchMovieData(){
  try {
    const response = await fetch('/data/movies.json');
    if (!response.ok) {
      throw new Error('Response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}