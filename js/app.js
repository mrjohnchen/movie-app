//Initial Values
const API_KEY = 'e8f5f4a83b543d169d392a9f4ee0d5ea';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=e8f5f4a83b543d169d392a9f4ee0d5ea'
const image_url = 'https://image.tmdb.org/t/p/w500';


// Selecting elements from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=e8f5f4a83b543d169d392a9f4ee0d5ea`;
    return url;
}

function requestMovies(url, onComplete, onError) {
    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log('Error: ', error);
        });
    inputElement.value = '';
    console.log('Value: ', value);
}
}

function movieSection(movies) {
    return movies.map((movie) => {
        return `<img src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>`;
    })
}

function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
    <section class="section">
        ${movieSection(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
    // data.results []
    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data: ', data);
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
    const value = inputElement.value;
    searchMovie(value);
}

function createVideoTemplate(data, content) {
    // TODO
    // display movie videos
    content.innerHTML = '<p id="content-close">X</p>';
    console.log('Videos: ', data);
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i]; //video
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}

//Event Delegation
document.onclick = function (event) {

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ', movieId);
        const section = event.target.parentElement; //section
        const content = section.nextElementSibling; //content
        content.classList.add('content-display');


        //fetch movie videos
        fetch(url)
            .then((res) => res.json())
            .then((data) => {

            })
            .catch((error) => {

            });
    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}