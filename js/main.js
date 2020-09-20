const API_KEY = 'e8f5f4a83b543d169d392a9f4ee0d5ea';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=e8f5f4a83b543d169d392a9f4ee0d5ea';
const image_url = 'https://image.tmdb.org/t/p/w500';

const buttonElement = document.querySelector("#search");
const searchText = document.querySelector("#searchText");
const movieSearchable = document.querySelector("#movies-searchable");
const movieContainer = document.querySelector("#movies-container");
const modal = document.querySelector("#modal");
const img = document.getElementsByClassName("img");
const span = document.getElementsByClassName("close")[0];

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

function movieSection(movies) {
    const section = document.createElement('section');
    section.classList = 'section';

    movies.map((movie) => {
        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src = image_url + movie.poster_path;
            img.setAttribute('data-movie-id', movie.id);

            section.appendChild(img);
        }
    })
    return section;
}

function createMovieContainer(movies, title = '') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const header = document.createElement('h2');
    header.innerHTML = title;
    header.setAttribute('id', title);

    const content = document.createElement('div');
    content.classList = 'content';

    const contentClose = `<p id="content-close">Close</p>`;

    content.innerHTML = contentClose;

    const section = movieSection(movies);

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);

    return movieElement;
}

function renderSearchMovies(data) {
    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data: ', data);
}

function renderMovies(data) {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    movieContainer.appendChild(movieBlock);
    console.log('Data: ', data);
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

function createVideoTemplate(data, content) {
    content.innerHTML = '<h4 id="content-close">Close</h4>';
    console.log('Videos: ', data);
    const videos = data.results;

    if (videos.length == 0) {
        noVideoContainer.style.display = "block";
    }

    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}

function searchMovie(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;

    requestMovies(url, renderSearchMovies, handleError);
}

function handleError(error) {
    console.log('Error: ', error);
}

buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = searchText.value;
    searchMovie(value);
    searchText.value = '';
    console.log('Values: ', value);
}

document.onclick = function (event) {
    $('#movies-container').modal('show');

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        console.log('Event: ', event);
        const movieId = target.dataset.movieId;
        console.log('Movie Id: ', movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}

function getTopRatedMovies() {
    const path = '/movie/top_rated';
    const url = generateUrl(path);
    const render = renderMovies.bind({
        title: 'Top-Rated Movies'
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

function getUpcomingMovies() {
    const path = '/movie/upcoming';
    const url = generateUrl(path);
    const render = renderMovies.bind({
        title: 'Upcoming Movies'
    });
    requestMovies(url, render, handleError);
}

getTopRatedMovies();

getPopularMovies();

getUpcomingMovies();