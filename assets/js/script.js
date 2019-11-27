// Event listener for drop downs
document.addEventListener('DOMContentLoaded', function() {
	var options = document.querySelectorAll('option');
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
})


//search recipe
var searchURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=5";
var dietFilter = "&diet="
// pescetarian, lacto vegetarian, ovo vegetarian, vegan, vegetarian
var excludeFilter = "&excludeIngredients=";
var intoleranceFilter = "&intolerances=";
// dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, wheat
var recipeType = "&type=";
// options main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink
var querySearch = "&query=";
var recipeID = 0;

// input value
var userSearch = $("#searchInput").val();
// left and right page columns
var searchIcon = document.querySelector(".search-icon");
var rightSide = document.querySelector("#rightSide");

var recipeID = [];
var currentRecipeID = 0;

searchIcon.addEventListener("click", function() {
	recipeID = [];
	var query = $("#searchInput").val();
	var settingsA = {
		"async": true,
		"crossDomain": true,
		"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=5&offset=0&query=" + query,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
			"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
	}
}

	$.ajax(settingsA).done(function (response) {
		console.log(response);
		for (var i=0; i < response.results.length; i++) {
		recipeID.push(response.results[i].id);
		}
		for (var j=0; j < recipeID.length; j++) {
			var settingsB = {
				"async": true,
				"crossDomain": true,
				"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeID[j] + "/information",
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
					"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
				}
			}

			var recipeIDModal = 0;
			
			$.ajax(settingsB).done(function (response) {
				console.log(response);
				var newDiv=document.createElement("div");
				newDiv.setAttribute("class", "recipeDiv");
				newDiv.setAttribute("id", response.id);
				newDiv.append("Recipe Name: " + response.title);
				$(newDiv).append("<br>");
				newDiv.append("Servings: " + response.servings);
				$(newDiv).append("<br>");
				newDiv.append("Total Time: " + response.readyInMinutes);
				rightSide.append(newDiv);

				newDiv.addEventListener("click", function(event) {

			var settingsC = {
				"async": true,
				"crossDomain": true,
				"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + newDiv.id + "/information",
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
					"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
				}
			}
					console.log(event);
					console.log(newDiv.id);
					

					$.ajax(settingsC).done(function (response) {
						console.log("Recipe Title: " + response.title);
						console.log(response.image);
						console.log("Servings: " + response.servings);
						for (var k = 0; k < response.extendedIngredients.length; k++) {
							console.log("Ingredient Item: " + response.extendedIngredients[k].name);
						}
						console.log("Instructions: " + response.instructions);
						console.log("Source URL: " + response.sourceUrl);
					})
					
				});
			});
		}
	});
});