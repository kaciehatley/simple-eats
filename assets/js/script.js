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
	if (renderList !== null) {
		groceryList = renderList;
	}
	var options = document.querySelectorAll('option');
    var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems, options);
	$('.addedAlert').attr("style", "display: none");
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
		"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=6&offset=0&query=" + query,
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
				var cardDiv = document.createElement("div");
				var createCardDiv = document.createElement("div");
				var cardImgDiv = document.createElement("div");
				var cardContentDiv = document.createElement("div");
				var cardImg = document.createElement("img");
				var cardTitle = document.createElement("span");
				var cardContent = document.createElement("p");

				cardDiv.setAttribute("id", response.id);
				cardDiv.setAttribute("class", "col s12 m4 cardDiv");
				createCardDiv.setAttribute("class", "card");
				cardImgDiv.setAttribute("class", "card-image");
				cardContentDiv.setAttribute("class", "card-content");
				cardImg.setAttribute("src", response.image);
				cardImg.setAttribute("class", "cardImg");
				cardTitle.setAttribute("class", "card-title");
				cardTitle.innerHTML = response.title;
				cardContent.innerHTML = "<b>Servings: </b>" + response.servings + "<br>" + "<b>Total Time: </b>" + response.readyInMinutes + "<br>" + "<b>Source: </b>" + response.sourceName + "<br>" +"<b>Health Score: </b>" + response.healthScore;

				cardImgDiv.appendChild(cardImg);
				cardImgDiv.appendChild(cardTitle);
				cardContentDiv.appendChild(cardContent);
				createCardDiv.appendChild(cardImgDiv);
				createCardDiv.appendChild(cardContentDiv);
				cardDiv.appendChild(createCardDiv);
				resultsDiv.appendChild(cardDiv);


				// var newDiv=document.createElement("div");
				// newDiv.setAttribute("class", "recipeDiv");
				// newDiv.setAttribute("id", response.id);
				// newDiv.append("Recipe Name: " + response.title);
				// $(newDiv).append("<br>");
				// newDiv.append("Servings: " + response.servings);
				// $(newDiv).append("<br>");
				// newDiv.append("Total Time: " + response.readyInMinutes);
				// resultsDiv.append(newDiv);

				cardDiv.addEventListener("click", function(event) {
					var settingsC = {
						"async": true,
						"crossDomain": true,
						"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + cardDiv.id + "/information",
						"method": "GET",
						"headers": {
							"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
							"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
						}
					}
					console.log(event);
					console.log(cardDiv.id);
					$.ajax(settingsC).done(function (response) {

						$('#recipeTitle').text(response.title);
						$('#servings').text("Yields: " + response.servings + " servings");
						for (var h=0; h < response.extendedIngredients.length; h++) {
							$('#ingredientList').append(response.extendedIngredients[h].measures.us.amount + " " + response.extendedIngredients[h].measures.us.unitShort + " " + response.extendedIngredients[h].name +'<i class="fas fa-plus plusBtn circle" data-name="' + response.extendedIngredients[h].name + '"></i><br/>');
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

function pTagDelay() {
	setTimeout(function () {
		$('.addedAlert').attr("style", "display: none");
	}, 1000);
}

$(document).on("click", ".plusBtn", function () {
	event.preventDefault();
	// console.log("Hello there");
	console.log($(this).data("name"));
	var groceryItem = $(this).data("name");
	groceryList.push(groceryItem);
	localStorage.setItem("groceryList", JSON.stringify(groceryList));
	$('.addedAlert').attr("style", "display: block");
	$('.addedAlert').text("Added To Grocery List!");
	pTagDelay();
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
	groceryList = [];
})


//This initiates the modals on the results page
$(document).ready(function(){
    $('.modal').modal();
});


var suggRec = ["798360", "110434", "758097", "837690", "775955", "496200", "246055", "532503", "213255", "668334", "246532"];

createSuggested();
function createSuggested() {
	var suggID = [];
	for (i=0; i<3; i++) {
		suggID[i] = suggRec[Math.floor(suggRec.length * Math.random())];
	}
	// sugg recipe 1
	var settingsD = {
		"async": true,
			"crossDomain": true,
			"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + suggID[0] + "/information",
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
			}
		}
		$.ajax(settingsD).done(function (response) {
			console.log(response);
			$('#recipeEl0').append("<h5 class='center'>" + response.title + "</h5>");
			$('#recipeEl0').css('background-image', 'url(' + response.image + ')');
		});	

		// sugg recipe 2
		var settingsD = {
			"async": true,
				"crossDomain": true,
				"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + suggID[1] + "/information",
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
					"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
				}
			}
			$.ajax(settingsD).done(function (response) {
				console.log(response);
				$('#recipeEl1').append("<h5 class='center'>" + response.title + "</h5>");
				$('#recipeEl1').css('background-image', 'url(' + response.image + ')');
			});	

			// sugg recipe 3
			var settingsD = {
				"async": true,
					"crossDomain": true,
					"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + suggID[2] + "/information",
					"method": "GET",
					"headers": {
						"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
						"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
					}
				}
				$.ajax(settingsD).done(function (response) {
					console.log(response);
					$('#recipeEl2').append("<h5 class='center'>" + response.title + "</h5>");
					$('#recipeEl2').css('background-image', 'url(' + response.image + ')');
				});	
	console.log(suggID);
}
