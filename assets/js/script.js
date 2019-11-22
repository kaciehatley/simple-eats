// example URL
// https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%252C%20gluten&number=10&offset=0&type=main%20course&query=burger

// %252c comma
// %20 space

//search recipe
var searchURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=5";
var dietFilter = "diet="
// pescetarian, lacto vegetarian, ovo vegetarian, vegan, vegatarian
var excludeFilter = "&excludeIngredients=";
var intoleranceFilter = "&intolerances=";
// dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, wheat
var recipeType = "&type=";
// options main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink
var querySearch = "&query=";
var recipeID = 0;

var userSearch = $("#searchInput").val();


var searchSettings = {
	"async": true,
	"crossDomain": true,
	"url": searchURL + querySearch + userSearch,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "2c0902d4a1msheb747a991f4e9efp1a7792jsna66814885f61"
	}
}

$("searchBtn").on("click", function() {
   
    

});
$.ajax(searchSettings).done(function(response) {
	console.log(response);
});


// use data index to link id to onclick ajax call
// title - response.title
// servings - response.servings
// image - response.image

// pulls complete recipe info including nutrition
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeID + "/information?includeNutrition=true",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "2c0902d4a1msheb747a991f4e9efp1a7792jsna66814885f61"
	}
}

$.ajax(settings).done(function (response) {
    for (i=0; i < response.length; i++) {
        $(divName).append("<div data-index='" + response.results[i].id + "></div>")
}
	console.log(response);
});

// This is a test
// adding a line here...

