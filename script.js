//Store the API links

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

//Store the HTML elements

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//Call functon to initially generate most popular movies

getMovies(APIURL);

//Function to fetch data from API:

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    //Call function to show whichever data is passed as a parameter

    showMovies(respData.results);
}

//Function to show API data in HTML:

function showMovies(movies) {
    
    //Clear the main element

    main.innerHTML = "";

    //Iterate through the API data

    movies.forEach(movie => {

        //Destructure the values we want from the objects

        const { poster_path, title, vote_average, overview } = movie;

        //Create HTML div element and style

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        //HTML template for div element

        movieEl.innerHTML = `
            <img 
                src="${IMGPATH + poster_path}" 
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">
                ${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        //Send all of the above to the main element in the HTML file

        main.appendChild(movieEl)
    });
}

//Changes the color of the movie rating depending on how high or low it is

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

//Uses the API search feature to generate what you type into the search bar

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
})



