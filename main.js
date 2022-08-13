const key = "cef19669"  //Api Need this key 


const movieDisplay = document.getElementById("movie--display")
const serchValue = document.getElementById("form--serch")
const serchBtn = document.getElementById("form--btn")

// +++++++++++++++++++++++++++++++++++++++
// Connect Api and take serched data object
// +++++++++++++++++++++++++++++++++++++++

serchBtn.addEventListener("click", () => {
    fetch(`https://www.omdbapi.com/?s=${serchValue.value}&apikey=${key}&plot=full`)
        .then(res => res.json())
        .then(data => {
           
            serchValue.value = ""
            movieDisplay.innerHTML = `<p>Jakiś tekst</p>`
            const serchPool = data.Search.map(movie=>movie.imdbID)
            console.log(serchPool[0])
            const serchPoolFetch = serchPool.map(id=>
              
                fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`))
            console.log(serchPoolFetch[0].Title)
        })
})









