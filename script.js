const image1 = "https://hips.hearstapps.com/countryliving/assets/15/40/1443546809-gettyimages-71971210.jpg"
const image2 = "https://images.pexels.com/photos/162318/cheetahs-cubs-two-together-162318.jpeg"
const image3 = "https://images.pexels.com/photos/568022/pexels-photo-568022.jpeg"
const image4 = "https://images.pexels.com/photos/1670413/pexels-photo-1670413.jpeg"
const image5 = "https://images.pexels.com/photos/3908821/pexels-photo-3908821.jpeg"
const image6 = "https://images.pexels.com/photos/15803552/pexels-photo-15803552.jpeg"
const image7 = "https://images.pexels.com/photos/10386190/pexels-photo-10386190.jpeg"
const image8 = "https://images.pexels.com/photos/19887619/pexels-photo-19887619.jpeg"
const image9 = "https://images.pexels.com/photos/4012569/pexels-photo-4012569.jpeg"
const image10 = "https://images.pexels.com/photos/19590471/pexels-photo-19590471.jpeg"

/* const images = [image1, image1, image2, image2, image3, image3, image4, image4, image5, image5, image6, image6, image7, image7, image8, image8, image9, image9, image10, image10] */

const images = [
    "https://hips.hearstapps.com/countryliving/assets/15/40/1443546809-gettyimages-71971210.jpg",
    "https://images.pexels.com/photos/162318/cheetahs-cubs-two-together-162318.jpeg",
    "https://images.pexels.com/photos/568022/pexels-photo-568022.jpeg",
    "https://images.pexels.com/photos/1670413/pexels-photo-1670413.jpeg",
    "https://images.pexels.com/photos/3908821/pexels-photo-3908821.jpeg",
    "https://images.pexels.com/photos/15803552/pexels-photo-15803552.jpeg",
    "https://images.pexels.com/photos/10386190/pexels-photo-10386190.jpeg",
    "https://images.pexels.com/photos/19887619/pexels-photo-19887619.jpeg",
    "https://images.pexels.com/photos/4012569/pexels-photo-4012569.jpeg",
    "https://images.pexels.com/photos/19590471/pexels-photo-19590471.jpeg"]

const shuffleArray = array => {
    const imagesArray = [...array, ...array]
    for (let i = imagesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = imagesArray[i];
        imagesArray[i] = imagesArray[j];
        imagesArray[j] = temp;
    }
    return imagesArray
}

const cardComponent = (image) => `
    <div class="card">
        <img src=${image} class="hidden">
    </div>
`

const winComponent = () => `
    <div id="win">    
    <h1>Congratulations, you won!</h1>
        <img src="https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg">
    </div>
`

const cardsDiv = document.getElementById("cardsDiv")
const buttonsDiv = document.getElementById("buttonsDiv")

let listOfClickedCards = []
let foundCards = []

const cardClickEvent = (event) => {
    // TIMED HIDING
    /* if (listOfClickedCards.length < 2) {
        event.target.firstElementChild.classList.remove("hidden")
        listOfClickedCards.push(event.target.firstElementChild)
    }

    if (listOfClickedCards.length === 2 && listOfClickedCards[0].src !== listOfClickedCards[1].src) setTimeout(function() {
        listOfClickedCards.forEach(card => card.classList.add("hidden"))
        listOfClickedCards = []
        }, 3000) */

    // ONCLICK HIDING
    if (listOfClickedCards.length < 2) {
        event.target.firstElementChild.classList.remove("hidden")
        listOfClickedCards.push(event.target.firstElementChild)
    } else if (listOfClickedCards.length === 2 && listOfClickedCards[0].src !== listOfClickedCards[1].src) {
        listOfClickedCards.forEach(card => card.classList.add("hidden"))
        listOfClickedCards = []
        if (event.target.tagName === "IMG") {
            event.target.classList.remove("hidden")
            listOfClickedCards.push(event.target)
        } else if (event.target.firstElementChild && event.target.firstElementChild.tagName === "IMG") {
            event.target.firstElementChild.classList.remove("hidden")
            listOfClickedCards.push(event.target.firstElementChild)
        }
    }
    if (listOfClickedCards.length === 2 && listOfClickedCards[0].src === listOfClickedCards[1].src) {
        listOfClickedCards.forEach(card => {
            card.classList.add("found")
            foundCards.push(card)
        })
        listOfClickedCards = []
    }

    if (foundCards.length === images.length*2) {
        buttonsDiv.insertAdjacentHTML("afterend", winComponent())
        foundCards = []
    }

}

const startButton = document.getElementById("start")
startButton.addEventListener("click", () => {
    if (document.getElementById("win")) document.getElementById("win").remove()
    cardsDiv.innerHTML = null
    shuffleArray(images).forEach(image => cardsDiv.insertAdjacentHTML("beforeend", cardComponent(image)))

    const allCards = document.querySelectorAll(".card")

    allCards.forEach(card => card.addEventListener("click", (event) => cardClickEvent(event)))

    //winDiv.insertAdjacentHTML("afterbegin", winComponent())
})
