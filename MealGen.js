// declaring the variables which hold our button and mealinfo div, allowing them to be called later in the function.
let mealBtn = document.getElementById('mealBtn');
let mealContaine = document.getElementById("mealInfo");
//When our button is clicked this function is called, it then uses the fetch function to make a promise and get a random meal. We then parse it and send it to our other funtions
function fetchMeal() {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then (data => distribute(data.meals[0]))
}
function distribute(meal) { // Before going to the functions that add new recipes to html elements, it goes in and empties any current recipes to avoid overlapping recipes.
  document.getElementById("recipeTitle").innerHTML = "";
  document.getElementById("recipeCategory").innerHTML = "";
  document.getElementById("instructions").innerHTML = "";
  document.getElementById("mealInfo").innerHTML = "";
  createTitle(meal);
  createIngre(meal);
}
//this section creates an ingredient list from the data and then adds it as a ul to our website.
function createIngre(meal) { // This function starts by going through our api data and adding each ingredient and corresponding measure through a for loop.
  let ingre =[];
  for (let i = 1; i <= 20; i++) {
			ingre.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `)
  }
  /* here we create a variable to create a ul and one that creates lis after which is goes through the array we created earlier and creates a list item for each item
  in the array and then adds it to our meal container as a ul. */
  let ingreList = document.createElement('ul');
  var ingredientLi = document.createElement('li');
//using a for loop to go through our previous array to add each to a text node which is made into an li element
  for (let i = 1; i <= 20; i++) {
    let ingredient = `${ingre[`${i}`]}`;
//if statement is checking if ingredient is empty or undefined and not allow it to become an li, if not it goes ahead.
    if (ingredient == " -  " || ingredient == " -   " || ingredient == null || ingredient == undefined) {
      break;
    }
    else {
      ingredientLi.appendChild(document.createTextNode(`${ingre[`${i}`]} |  `));
      ingreList.appendChild(ingredientLi);
      document.getElementById('mealInfo').appendChild(ingreList);
    }
  }
}
//This function adds images,titles and categories.
function createTitle(meal) {
  let title = document.getElementById("recipeTitle");
  let category = document.getElementById("recipeCategory");
  let image = document.getElementById("recipeImg");
  let instructions = document.getElementById("instructions")
  title.appendChild(document.createTextNode(`${meal[`strMeal`]}`));
  category.appendChild(document.createTextNode(`Category : ${meal[`strCategory`]}`));
  image.src = `${meal[`strMealThumb`]}`;
  instructions.appendChild(document.createTextNode(`Instructions : ${meal[`strInstructions`]}`));
}
