// example URL
// https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%252C%20gluten&number=10&offset=0&type=main%20course&query=burger

// %252c comma
// %20 space

var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?";
var dietFilter = "diet="
var excludeFilter = "&excludeIngredients=";
var intolFilter = "&intolerances=";
var recipeType = "&type=";
// options main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink
var querySearch = "&query=";
