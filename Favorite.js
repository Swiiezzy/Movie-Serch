
const movieDisplay = document.getElementById("movie--display")
const key = "cef19669"  //Api Need this key 
var favorite = localStorage.getItem("favorite") == null ? [] : JSON.parse(localStorage.getItem("favorite"))


function addToWatchlist(id) {
    console.log(JSON.stringify(favorite))
    document.getElementById(id).style.backgroundColor = "green"
    console.log(favorite.indexOf(id))
    if (favorite.indexOf(id) != -1) {
        document.getElementById(id).style.backgroundColor = "red"
        favorite.splice(favorite.indexOf(id), 1)
    }
    else { favorite.push(id) }

    localStorage.setItem('favorite', JSON.stringify(favorite));
    render()
}

console.log(localStorage.getItem("favorite") == null)



function render() {
    movieDisplay.innerHTML = favorite.length == 0 ? `<h2 class="empty">LIST IS EMPTY :(</h2>` : ""
    for (let i = 0; i < favorite.length; i++) {
        fetch(`http://www.omdbapi.com/?i=${favorite[i]}&plot=full&apikey=${key}`).then(res => res.json())
            .then(data => {
                console.log(data)

                // creat obj with usefull data from api
                const Movieinfo = {
                    Title: data.Title,
                    Released: data.Released,
                    Actors: data.Actors,
                    Country: data.Country,
                    Language: data.Language,
                    id: data.imdbID,
                    image: data.Poster,
                    Plot: data.Plot,
                    Ratings: data.Ratings[0].Value
                }
                // check if movie is fevorit list if yest backgrund green if not red
                const color = favorite.indexOf(Movieinfo.id) != -1 ? "green" : "red"


                // render Movie

                movieDisplay.innerHTML += `
                <div class="movie--display--one border">
                                    <div class="img">
                                     <img alt ="${Movieinfo.Title}"src="${Movieinfo.image}">
                                    </div>
                                    <div class="movie--display--one--infofolder">
                                        <div class="flex">
                                         <h2>${Movieinfo.Title}</h2>
                                         <p>Ratings :${Movieinfo.Ratings}</p>
                                          <button style="background-color:${color};" class="btn" id="${Movieinfo.id}" onclick="addToWatchlist(this.id)"></button>
                                        </div class="movie--display--one--infofolder--info--flex">
                                        <div>
                                        <p>Language:${Movieinfo.Language}</p>
                                        <p>Released :${Movieinfo.Released}</p>
                                        <p>Actors :${Movieinfo.Actors}</p>
                                        <p>Plot :${Movieinfo.Plot}</p>
                                        </div>
                                    </div>
                                </div>
                                `





            })
    }
}



render()


