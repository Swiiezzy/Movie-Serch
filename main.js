const key = "cef19669"  //Api Need this key 
var favorite = localStorage.getItem("favorite") == null ? [] : JSON.parse(localStorage.getItem("favorite"))
console.log(favorite)

const movieDisplay = document.getElementById("movie--display")
const serchValue = document.getElementById("form--serch")
const serchBtn = document.getElementById("form--btn")

// +++++++++++++++++++++++++++++++++++++++
// Connect Api and take serched data object
// +++++++++++++++++++++++++++++++++++++++
var color = false
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

    // console.log(document.getElementById(id).parentNode.parentNode.parentNode.childNodes[1].childNodes[1].src)   

    // console.log(document.getElementById(id).parentNode.parentNode.childNodes[1].textContent)

    // console.log(document.getElementById(id).parentNode.parentNode.childNodes[3].textContent)

    // console.log(document.getElementById(id).parentNode.parentNode.childNodes[5].textContent)

    // console.log(document.getElementById(id).parentNode.parentNode.childNodes[7].textContent)

    // console.log(document.getElementById(id).parentNode.parentNode.childNodes[9].textContent)
    // favorite.push([id,])
}

function query() {
    console.log(document.querySelectorAll(".btn"))


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
                                  <button style="background-color:${color};" class="btn btn2" id="${Movieinfo.id}" onclick="addToWatchlist(this.id)"></button>
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

    )
})



// fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`))





