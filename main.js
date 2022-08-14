const key = "cef19669"  //Api Need this key 


const movieDisplay = document.getElementById("movie--display")
const serchValue = document.getElementById("form--serch")
const serchBtn = document.getElementById("form--btn")

// +++++++++++++++++++++++++++++++++++++++
// Connect Api and take serched data object
// +++++++++++++++++++++++++++++++++++++++

function addToWatchlist(a){
    console.log(a)

}


serchBtn.addEventListener("click", () => {
    fetch(`https://www.omdbapi.com/?s=${serchValue.value}&apikey=${key}&plot=full`)
        .then(res => res.json())
        .then(data => {
            movieDisplay.innerHTML = ""
            serchValue.value = ""
            // Creat arr with all serched movie id
            const idSerched = data.Search.map(movie => movie.imdbID)
            return { idSerched }

        }).then(data => {

            // call api with id serched movie and gather data
            for (let i = 0; i < data.idSerched.length; i++) {
                fetch(`http://www.omdbapi.com/?i=${data.idSerched[i]}&plot=full&apikey=${key}`).then(res => res.json())
                    .then(data => {


                        // creat obj with usefull data from api
                        const Movieinfo = {
                            Title: data.Title,
                            Released: data.Released,
                            Actors: data.Actors,
                            Country: data.Country,
                            Language: data.Language,
                            id: data.imdbID,
                            image: data.Poster,
                            Plot: data.Plot
                        }
                              // render Movie
                        movieDisplay.innerHTML += `
                        <div class="movie--display--one">
                            <div class="img">
                             <img src="${Movieinfo.image}">
                            </div>
                            <div class="movie--display--one--infofolder">
                                <div class="flex">
                                 <h2>${Movieinfo.Title}</h2>
                                  <button class="btn" id="${Movieinfo.id}" onclick="addToWatchlist(this.id)"></button>
                                </div>
                                <p>Language:${Movieinfo.Language}</p>
                                <p>Released :${Movieinfo.Released}</p>
                                <p>Actors :${Movieinfo.Actors}</p>
                                <p>Plot :${Movieinfo.Plot}</p>
                            </div>
                        </div>
                        `
                    })
            }
        }).then(
            console.log(document.querySelector('btn'))
            
        )
})



// fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`))





