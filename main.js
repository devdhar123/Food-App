const randomMealElm = document.querySelector(".random-meal")
const loader = document.querySelector(".loaderCon")
let input = document.getElementById("search")
let btn = document.getElementById("searchBtn")
let result = document.querySelector(".result")
async function getRandomApi(params) {
    try {
        loader.style.display = "grid"
        const api = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        const data = await api.json()
        const meal = data.meals[0]
        loader.style.display = "none"
        addMeal(meal)
    } catch (error) {
        console.log(error);

    }
}
getRandomApi()
function addMeal(meal) {
    const mealElm = document.createElement("div")
    //   console.log(mealElm);
    mealElm.classList.add("meal")
    mealElm.innerHTML = `<img src="${meal.strMealThumb
        }" alt="">
    <div class="info">
        <p>${meal.strMeal.slice(0, 20)}...</p>
        <a href="${meal.strSource}" target ="_blank" class="btn">Watch Recipe</a>
    </div>`

    randomMealElm.appendChild(mealElm)
}

async function getMeal(search) {
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    const data = await api.json()
    const meal = data.meals
    return meal
}
getMeal()

btn.addEventListener('click', async () => {
    const value = input.value
    loader.style.display = "grid"
    const meal = await getMeal(value)
    if (meal == null) {
        loader.style.display = "none"
        result.style.display = "grid"
    }
    else {
        randomMealElm.innerHTML = ""
        result.style.display = "none"
        loader.style.display = "none"
        meal.forEach(element => {
            console.log(element);
            addMeal(element)
        });
        input.value = ""
    }

})