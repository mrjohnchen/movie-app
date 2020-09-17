//Initial Values
const API_KEY = 'e8f5f4a83b543d169d392a9f4ee0d5ea';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=e8f5f4a83b543d169d392a9f4ee0d5ea';
const image_url = 'https://image.tmdb.org/t/p/w500';

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=e8f5f4a83b543d169d392a9f4ee0d5ea`;
    return url;
}

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function searchMovie(value) {
    const path = '/search/movie'; //generate dynamic url
    const url = generateUrl(path) + '&query=' + value;

    requestMovies(url, renderSearchMovies, handleError);
}

function getUpcomingMovies() {
    const path = '/movie/upcoming';
    const url = generateUrl(path);
    const render = renderMovies.bind({
        title: 'Upcoming Movies'
    });
    requestMovies(url, render, handleError);
}

function getTopRatedMovies() {
    const path = '/movie/top_rated';
    const url = generateUrl(path);
    const render = renderMovies.bind({
        title: 'Top Rated Movies'
    });
    requestMovies(url, render, handleError);
}

function getPopularMovies() {
    const path = '/movie/popular';
    const url = generateUrl(path);
    const render = renderMovies.bind({
        title: 'Popular Movies'
    });
    requestMovies(url, render, handleError);
}