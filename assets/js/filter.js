// $(fBtn).on("click", function() {
recipeID = [];
var fSearch = document.getElementById("filterSearch");
var fDiet = document.getElementById("dietOptions");
var fExcluded = document.getElementById("exclIngr");
var fAllergy = document.getElementById("allergyOptions");
var fType = document.getElementById("mealTypeOptions");
var fBtn = document.getElementById("filterBtn");

var dietFilter = "&diet="
	// pescetarian, lacto vegetarian, ovo vegetarian, vegan, vegetarian
var excludeFilter = "&excludeIngredients=";
var intoleranceFilter = "&intolerances=";
	// dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, wheat
var recipeType = "&type=";
	// options main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink
var querySearch = "&query=";


function filterList() {
	event.preventDefault();

	recipeID = [];
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

	// filter search
	var query = fSearch.value;
	console.log(query);
	
	//filter diet options
	var dietOpts = [];
	// loop through options in select list
	for (var i=0, len=fDiet.options.length; i<len; i++) {
		optD = fDiet.options[i];
		// check if selected
		if ( optD.selected) {
			// add to array of option elements to return from this function
			dietOpts.push(optD.value);
		}
	}
	if (dietOpts !== null) {
		// add to url
		settingsA.url + dietFilter;
		for (var j=0; j < dietOpts.length; i++) {
			settingsA.url + dietOpts[j];
		}
	}
	console.log(dietOpts);

	// filter excluded items
	var exclVal = fExcluded.value;
	console.log(exclVal);
	if (exclVal !== null) {
		settingsA.url + excludeFilter + exclVal;
	}
	console.log(exclVal);

	// filter allergy
	var allergyOpts = [];
	// loop through options in select list
	for (var i=0, len=fAllergy.options.length; i<len; i++) {
		optA = fAllergy.options[i];
		// check if selected
		if ( optA.selected) {
			// add to array of option elements to return from this function
			allergyOpts.push(optA.value);
		}
	}
	if (allergyOpts !== null) {
		// add to url
		settingsA.url + intoleranceFilter;
		for (var j=0; j < allergyOpts.length; i++) {
			settingsA.url + allergyOpts[j];
		}
	}
	console.log(allergyOpts);

	// filter type
	var typeOpts = [];
	// loop through options in select list
	for (var i=0, len=fType.options.length; i<len; i++) {
		optT = fType.options[i];
		// check if selected
		if (optT.selected) {
			// add to array of option elements to return from this function
			typeOpts.push(optT.value);
		}
	}
	if (typeOpts !== null) {
		// add to url
		settingsA.url + recipeType;
		for (var j=0; j < typeOpts.length; i++) {
			settingsA.url + typeOpts[j];
		}
	}
	console.log(typeOpts);

	// run search
	
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
				var newDiv=document.createElement("div");
				newDiv.setAttribute("class", "recipeDiv");
				newDiv.setAttribute("id", response.id);
				newDiv.append("Recipe Name: " + response.title);
				$(newDiv).append("<br>");
				newDiv.append("Servings: " + response.servings);
				$(newDiv).append("<br>");
				newDiv.append("Total Time: " + response.readyInMinutes);
				rightSide.append(newDiv);
			});
		}
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
			});	
		});
	});
}
// new function using "this" with click event to retrieve ID
