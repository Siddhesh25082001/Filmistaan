const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('.main');
const form = document.querySelector('#form');
const search = document.querySelector('.search');

getMovies(API_URL);

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();

    if(respData.results.length == 0){
        const message =  document.createElement('div');
        main.innerHTML = `
            <div class="nothing">
                <img src="/images/search.png" alt="Image">
                <h2>Sorry we couldn't find any <br> matches for the movie</h2>
                <h5>Please try searching with another movie name</h5>
            </div>
        `;
        main.appendChild(message);
    }
    else{
        showMovies(respData.results);
    }
}

function showMovies(movies){
    main.innerHTML = '';

    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEL= document.createElement('div');
        movieEL.classList.add('movie');

        movieEL.innerHTML = `
            <img src="${getPosterpath(poster_path)}" alt="${title}">
            <div class="movie-info">
                <h6>${title}</h6>
                <span class="${getClassbyRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>${title}</h3>
               ${overview}
            </div>
        `;

        main.appendChild(movieEL);
    });
}

function getClassbyRate(vote){
    if(vote > 8){
        return 'green';
    }
    else if(vote >= 5){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = ''
    }
});

function getPosterpath(poster_path){
    if(poster_path != null){
        return IMGPATH + poster_path;
    }
    else{
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png';
    }
}

function refreshPage(){
    window.location.reload();
}
