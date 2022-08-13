const key = "cef19669"  //Api Need this key 



const serchValue = document.getElementById("form--serch")
const serchBtn = document.getElementById("form--btn")


serchBtn.addEventListener("click", apiConnect.then)

async function apiConnect() {
    let response = await fetch(`https://www.omdbapi.com/?s=${serchValue.value}&apikey=${key}`)
    let data = await response.json()
    console.log(serchValue.value)
    console.log(data)
    return data
}

