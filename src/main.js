

let apiKey = '6859949d';

let element = document.querySelector('.searchResults');

document.querySelector('.searchbar__button').addEventListener('click', function(){
    onSearch();
});


function onSearch(){
    let textString = document.querySelector('.searchbar input').value;
    if(textString.length > 0){
        getMovies(textString);
    }
}



function getMovies(movieName){

    movieName = movieName.toLowerCase().split(' ').join('+');

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}&r=xml`)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, "application/xml");
            console.log(xml);

            let movies = xml.getElementsByTagName('movie');
            let noResults = xml.getElementsByTagName('error');


            if(noResults.length > 0 && noResults != null && noResults != undefined){
                showErrorMessage();
            }else{
                // console.log(movies[0].attributes.title);
                // createMovieList(movies);
                console.log(movies);
            }
        });
}


function showErrorMessage(){
    element.innerHTML = `<div class="noResults">No Movies found</div>`;
}

function createMovieList(movies){

    for(let i = 0; i < movies.length; i++){
        element = document.querySelector('.searchResults');
        let movie = movies[0].attributes;
        element.innerHTML = `
            <li class="movie">
                    <div class="movie__poster">
                        <img src="${movie.poster.value}" alt="">
                    </div>
                    <div class="movie__info">
                        <div class="movie__title">${movie.title.value}</div>
                        <div class="movie__director"><span class="pre">Regisseur: </span><span class="after">${movie.director.value}</span></div>
                        <ul class="movie__actors">
                            ${movie.actors.value}
                        </ul>
                        <div class="movie__plot">${movie.plot.value}</div>
                    </div>
                </li>
        `;
    }
}

