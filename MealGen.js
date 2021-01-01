// declaring the variables which hold our button and mealinfo div, allowing them to be called later in the function.
let mealBtn = document.getElementById('mealBtn');
let mealContainer = document.getElementById("mealInfo");
// Now we add an event listener which waits for the user to click the button and then fetches a random meal from our api.
function fetchMeal() {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then (data => distribute(data.meals[0]))
  }
function distribute(meal) {
  createTitle(meal)
  createIngre(meal)
}
//this section creates an ingredient list from the data and then adds it as a ul to our website.
function createIngre(meal) {
  let ingre =[];
  for (let i = 1; i <= 20; i++) {
			ingre.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `)
  }
  return createIngreList(ingre);
}
function createIngreList(ingre) {
/* here we create a variable to create a ul and one that creates lis after which is goes through the array we created earlier and creates a list item for each item
in the array and then adds it to our meal container as a ul. */
  let ingreList = document.createElement('ul');
  var ingredientLi = document.createElement('li');
  for (let i = 1; i <= 20; i++) {
    let ingredient = `${ingre[`${i}`]}`;
    if (ingredient == " -  " || ingredient == " -   " || ingredient == null || ingredient == undefined) {
      break;
    }
    else {
          console.log(ingredient);
          ingredientLi.appendChild(document.createTextNode(`${ingre[`${i}`]}`));
          ingreList.appendChild(ingredientLi);
          document.getElementById('mealInfo').appendChild(ingreList);
    }
  }
}
function createTitle(meal) {
  let title = document.getElementById("recipeTitle");
  title.value = `${meal[`strMeal`]}`
}
