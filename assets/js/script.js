var fSearch = document.getElementById("filterSearch");
var fDiet = document.getElementById("dietOptions");
var fExcluded = document.getElementById("exclIngr");
var fAllergy = document.getElementById("allergyOptions");
var fType = document.getElementById("mealTypeOptions");
var fBtn = document.getElementById("filterBtn");

var groceryList = [];

// Event listener for drop downs
document.addEventListener('DOMContentLoaded', function() {
	var renderList = JSON.parse(localStorage.getItem("groceryList"));
	groceryList = renderList;
	var options = document.querySelectorAll('option');
    var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems, options);
})

document.addEventListener('DOMContentLoaded', function() {
	var options = document.querySelectorAll('option');
    var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems, options);
	
	$('.collapseBtn').on("click", function() {
		$('.sidenav').sidenav();
	})
  });

console.log($("#filterSearch").val());

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
var searchIcon = document.getElementById("download-button");
// var rightSide = document.querySelector("#rightSide");

var recipeID = [];
var currentRecipeID = 0;

var landingPage = $(".landingPage");
var resultsPage = $(".resultsPage");

// Food jokes

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
	}
}

$('#jokeIcon').on("click", function(){
	$.ajax(settings).done(function (response) {
		$('#foodJoke').text("");
		$('#foodJoke').text(response.text);
	});
})

function buttonClick() {
	event.preventDefault();
	landingPage.attr("style", "display:none;");
	resultsPage.attr("style", "display:block;");
	recipeID = [];
	var query = $("#search").val();
	fSearch.value = query;
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
			$.ajax(settingsB).done(function (response) {
				console.log(response);
				var resultsDiv = document.querySelector(".resultsDiv");
				var newDiv=document.createElement("div");
				newDiv.setAttribute("class", "recipeDiv");
				newDiv.setAttribute("id", response.id);
				newDiv.append("Recipe Name: " + response.title);
				$(newDiv).append("<br>");
				newDiv.append("Servings: " + response.servings);
				$(newDiv).append("<br>");
				newDiv.append("Total Time: " + response.readyInMinutes);
				resultsDiv.append(newDiv);

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

						$('#recipeTitle').text(response.title);
						$('#servings').text("Yields: " + response.servings + " servings");
						$('#servings').attr("href", response.sourceUrl);
						for (var h=0; h < response.extendedIngredients.length; h++) {
							$('#ingredientList').append(response.extendedIngredients[h].measures.us.amount + " " + response.extendedIngredients[h].measures.us.unitShort + " " + response.extendedIngredients[h].name +'<i class="fas fa-plus plusBtn" style="margin: 12px;padding: 2px; border: 1px solid black; border-radius: 30px;" data-name="' + response.extendedIngredients[h].name + '"></i><br/>');
						}
						$('#instructions').text("Instructions: " + response.instructions);
						$('#recipeImg').attr('src', response.image);
						$('#recipeURL').text("Source URL: " + response.sourceUrl);
						$('#modal1').modal('open'); 
					});	
				});
			});
		}
	});
};

$(document).on("click", ".plusBtn", function () {
	event.preventDefault();
	// console.log("Hello there");
	console.log($(this).data("name"));
	var groceryItem = $(this).data("name");
	groceryList.push(groceryItem);
	localStorage.setItem("groceryList", JSON.stringify(groceryList));
});

$('.groceryBtn').on("click", function() {
	event.preventDefault();
	$('.listItems').text("");
	var storedList = JSON.parse(localStorage.getItem("groceryList"));
	groceryList = storedList;
	for (var i= 0; i < groceryList.length; i++) {
		$('.listItems').append('<li>' + groceryList[i] + '</li>');
	}
	console.log(groceryList);
})

$('#clearList').on("click", function() {
	event.preventDefault();
	$('.listItems').text("");
	localStorage.clear();
})


//This initiates the modals on the results page
$(document).ready(function(){
    $('.modal').modal();
  });
// created filter functions and variables




