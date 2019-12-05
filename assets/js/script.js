var fSearch = document.getElementById("filterSearch");
var fDiet = document.getElementById("dietOptions");
var fExcluded = document.getElementById("exclIngr");
var fAllergy = document.getElementById("allergyOptions");
var fType = document.getElementById("mealTypeOptions");
var fBtn = document.getElementById("filterBtn");
var threshold = 100;

var groceryList = [];
// var storedList = JSON.parse(localStorage.getItem("groceryList"));



// Event listener for drop downs
document.addEventListener('DOMContentLoaded', function () {
	var renderList = JSON.parse(localStorage.getItem("groceryList"));
	if (renderList !== null) {
		groceryList = renderList;
	}
	var options = document.querySelectorAll('option');
	var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems, options);
	$('.addedAlert').attr("style", "display: none");
})

document.addEventListener('DOMContentLoaded', function () {
	var options = document.querySelectorAll('option');
	var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems, options);

	$('.collapseBtn').on("click", function () {
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
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
	}
}

$('#jokeIcon').on("click", function () {
	$.ajax(settings).done(function (response) {
		$('#foodJoke').text("");
		$('#foodJoke').text(response.text);
	});
})

//Tansition into Results Page
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
		for (var i = 0; i < response.results.length; i++) {
			recipeID.push(response.results[i].id);
		}
		for (var j = 0; j < recipeID.length; j++) {
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
				cardDiv.setAttribute("class", "col s12 m6 l4 cardDiv");
				createCardDiv.setAttribute("class", "card");
				cardImgDiv.setAttribute("class", "card-image");
				cardContentDiv.setAttribute("class", "card-content");
				cardImg.setAttribute("src", response.image);
				cardImg.setAttribute("class", "cardImg");
				cardTitle.setAttribute("class", "card-title");
				var split = response.title.split("#");
				var title = split[0];
				for (var i = 1; i < split.length; i++) {
					title = title + '<span class="hashtag">#' + split[i] + '</span>';
				}
				cardTitle.innerHTML = title;
				cardContent.innerHTML = "<b>Servings: </b>" + response.servings + "<br>" + "<b>Total Time: </b>" + response.readyInMinutes + "<br>" + "<b>Source: </b>" + response.sourceName + "<br>" + "<b>Health Score: </b>" + response.healthScore;

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

				cardDiv.addEventListener("click", function (event) {
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
						for (var h = 0; h < response.extendedIngredients.length; h++) {
							$('#ingredientList').append(response.extendedIngredients[h].measures.us.amount + " " + response.extendedIngredients[h].measures.us.unitShort + " " + response.extendedIngredients[h].name + '<i class="fas fa-plus plusBtn circle" data-name="' + response.extendedIngredients[h].name + '"></i><br/>');
						}
						console.log(response.instructions);
						if (response.instructions !== null) {
							$('#instructions').text("Instructions: " + response.instructions);
						}
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
	console.log(groceryItem);
	console.log(groceryList);
	if (groceryList !== null) {
		groceryList.push(groceryItem);
		localStorage.setItem("groceryList", JSON.stringify(groceryList));
		$('.addedAlert').attr("style", "display: block");
		$('.addedAlert').text("Added To Grocery List!");
		pTagDelay();
	}
	else {
		groceryList = [groceryItem];
		localStorage.setItem("groceryList", JSON.stringify(groceryList));
		$('.addedAlert').attr("style", "display: block");
		$('.addedAlert').text("Added To Grocery List!");
		pTagDelay();
	}
	console.log(groceryList);
});

$('.groceryBtn').on("click", function () {
	event.preventDefault();
	$('.listItems').text("");
	var storedList = JSON.parse(localStorage.getItem("groceryList"));
	groceryList = storedList;
	for (var i = 0; i < groceryList.length; i++) {
		$('.listItems').append('<li>' + groceryList[i] + '</li>');
	}
})

$('#clearList').on("click", function () {
	event.preventDefault();
	$('.listItems').text("");
	localStorage.clear();
	groceryList = [];
})

// Creates grocery list on landing page
function landingList() {
	var storedList = JSON.parse(localStorage.getItem("groceryList"));
	groceryList = storedList;
	if (groceryList !== null) {
		$("#gListEl").empty();
		for (var i= 0; i < groceryList.length; i++) {
			$('#gListEl').append('<li>' + groceryList[i] + '</li>');
		}
		if (groceryList.length > 3) {
			$('#gListEl').css("height", "100px");
			$('#gListEl').css("overflow-y", "scroll");
			$('#gListEl').css("overflow-x", "hidden");
		}
	}
}
landingList();

$("#groceryIcon").on("click", function(){
	event.preventDefault();
	var storedList = JSON.parse(localStorage.getItem("groceryList"));
	groceryList = storedList;
	if (groceryList !== null) {
		$("#gListLandEl").attr("style", "display: block; opacity: 0;");
		$('#gListModalUL').empty();
		for (var i= 0; i < groceryList.length; i++) {
			$('#gListModalUL').append("<li>" + groceryList[i] + "</li>");
		}
	}
	else {
		M.toast({html: 'No grocery list found.'});
	}
});

$('#clearListModal').on("click", function () {
	event.preventDefault();
	$('#gListModalUL').empty();
	$("#gListEl").empty();
	$('#gListEl').css("height", "auto");
	$('#gListEl').css("overflow-y", "visible");
	$('#gListEl').css("overflow-x", "visible");
	$("#gListEl").append("Create and keep your grocery list handy. You can add to your list right from your recipe.");
	localStorage.clear();
	groceryList = [];
});


//This initiates the modals on the results page
$(document).ready(function () {
	$('.modal').modal();
});

// Creates Suggested recipe blocks on landing page
var suggRec = ["101643", "110434", "145081", "213255", "226460", "245271", "246055", "246532", "469367", "482574", "494968", "496200", "507985", "532503", "552262", "586773", "588602", "668318", "668334", "668377", "723984", "758097", "775955", "798360", "837690"];

function createSuggested() {
	var suggID = [];
	for (i = 0; i < 3; i++) {
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
		$('#sugg0').data('recipe', response.id);
		$('#recipeEl0').append('<img src="' + response.image + '" alt="Recipe Image" class="cardImg sugImg">');
		$('#sugg0').prepend("<p class='center sugTitle'style='font-size: 2em;  height:auto;'>" + response.title + "</p>");
		$('.sugTitle').each(function () {
			var $self = $(this),
				fs = parseInt($self.css('font-size'));

			while ($self.height() > threshold) {
				$self.css({ 'font-size': fs-- });
			}
			$self.height(threshold);
		});
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
		$('#sugg1').data('recipe', response.id);
		$('#recipeEl1').append('<img src="' + response.image + '" alt="Recipe Image" class="cardImg sugImg">');
		$('#sugg1').prepend("<p class='center sugTitle'style='font-size: 2em;  height:auto;'>" + response.title + "</p>");
		$('.sugTitle').each(function () {
			var $self = $(this),
				fs = parseInt($self.css('font-size'));

			while ($self.height() > threshold) {
				$self.css({ 'font-size': fs-- });
			}
			$self.height(threshold);
		});
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
		$('#sugg2').data('recipe', response.id);
		$('#recipeEl2').append('<img src="' + response.image + '" alt="Recipe Image" class="cardImg sugImg">');
		$('#sugg2').prepend("<p class='center sugTitle'style='font-size: 2em;  height:auto;'>" + response.title + "</p>");
		$('.sugTitle').each(function () {
			var $self = $(this),
				fs = parseInt($self.css('font-size'));

			while ($self.height() > threshold) {
				$self.css({ 'font-size': fs-- });
			}
			$self.height(threshold);
		});
	});
	console.log(suggID);
	console.log()
}
createSuggested();

$('.suggested').on("click", function(event) {
	console.log($(this).data("recipe"));
	var clickedRecipe = $(this).data("recipe");
	var settingsE = {
		"async": true,
		"crossDomain": true,
		"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + clickedRecipe + "/information",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
			"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
	}
	}
	$.ajax(settingsE).done(function(response) {
		console.log(response);
	} );
});	
