//api de peliculas 

const API_KEY = 'api_key=b75ff10e9835c3ada8f3c1ac8e976fb8';
const BASE_Url = 'https://api.themoviedb.org/3';
const API_Url = BASE_Url + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const Img_Url = 'https://image.tmdb.org/t/p/w500';
const BuscarUrl = BASE_Url + '/search/movie?'+API_KEY;

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]



const main = document.getElementById('main');
const form = document.getElementById('form');
const buscar = document.getElementById('buscar');
const tagsEl = document.getElementById('tags');

var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            ObtenerPelis(API_Url + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
}





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

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
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
