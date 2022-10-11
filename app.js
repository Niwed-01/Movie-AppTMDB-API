//api de peliculas 

const API_KEY = 'api_key=b75ff10e9835c3ada8f3c1ac8e976fb8';
const BASE_Url = 'https://api.themoviedb.org/3';
const API_Url = BASE_Url + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const Img_Url = 'https://image.tmdb.org/t/p/w500';

const BuscarUrl = BASE_Url + '/search/movie?'+API_KEY;


const main = document.getElementById('main');
const form = document.getElementById('form');
const buscar = document.getElementById('buscar');

 

ObtenerPelis(API_Url);

function ObtenerPelis(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results)
        MostrarPelis(data.results)
    }) 
}

function MostrarPelis(data){
    main.innerHTML = '';
    
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${Img_Url+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span id="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${overview}
            </div>
        </div>
        
        `

        main.appendChild(movieEl);      
    })
}

function getColor(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return "orange"
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const buscarPeli = buscar.value;
    
    if(buscarPeli){
        ObtenerPelis(BuscarUrl+'&query='+buscarPeli)
    }else{
        ObtenerPelis(API_Url);
    }
})
