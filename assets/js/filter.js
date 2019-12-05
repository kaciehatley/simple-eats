// // $(fBtn).on("click", function() {
// recipeID = [];
// var fSearch = document.getElementById("filterSearch");
// var fDiet = document.getElementById("dietOptions");
// var fExcluded = document.getElementById("exclIngr");
// var fAllergy = document.getElementById("allergyOptions");
// var fType = document.getElementById("mealTypeOptions");
// var fBtn = document.getElementById("filterBtn");

// var dietFilter = "&diet="
// 	// pescetarian, lacto vegetarian, ovo vegetarian, vegan, vegetarian
// var excludeFilter = "&excludeIngredients=";
// var intoleranceFilter = "&intolerances=";
// 	// dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, wheat
// var recipeType = "&type=";
// 	// options main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink
// var querySearch = "&query=";


function filterList() {
	event.preventDefault();

	recipeID = [];
	var fSearch = document.getElementById("filterSearch");
	var fDiet = document.getElementById("dietOptions");
	var fExcluded = document.getElementById("exclIngr");
	var fAllergy = document.getElementById("allergyOptions");
	var fType = document.getElementById("mealTypeOptions");

	var dietFilter = "&diet=";
	// pescetarian, lacto vegetarian, ovo vegetarian, vegan, vegetarian
	var excludeFilter = "&excludeIngredients=";
	var intoleranceFilter = "&intolerances=";
	// dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, wheat
	var recipeType = "&type=";
	// options main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink

	// filter search
	var query = fSearch.value;

	//filter diet options
	var dietOpts = [];
	// loop through options in select list
	for (var i=0, len=fDiet.options.length; i<len; i++) {
		optD = fDiet.options[i];
		// check if selected
		if (optD.selected) {
			// add to array of option elements to return from this function
			dietOpts.push(optD.value);
		}
		console.log(dietOpts); // runs 5 times
	}

	// filter excluded items
	var exclVal = fExcluded.value;
	console.log(exclVal);
	

	// filter allergy
	var allergyOpts = [];
	// loop through options in select list
	for (var i=0, len=fAllergy.options.length; i<len; i++) {
		optA = fAllergy.options[i];
		// check if selected
		if (optA.selected) {
			// add to array of option elements to return from this function
			allergyOpts.push(optA.value);
		}
	}

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
	

	// run search
	recipeID = [];
	
	console.log(query);
	// console.log(settingsA.url);
	
	console.log(dietOpts);
	console.log(exclVal);
	console.log(allergyOpts);
	console.log(typeOpts);

	var settingsA = {
		"async": true,
		"crossDomain": true,
		"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
			"x-rapidapi-key": "2388dc2328mshdfb27ddd851a294p139d5ejsnff16b5b1257e"
		}
	}

	if (dietOpts.length > 0) {
		// add to url
		settingsA.url += dietFilter;
		// settingsA.url += dietFilter + dietOpts;
		// settingsA.url + dietOpts;
		var lastOptD = dietOpts.length - 1;
		console.log(dietOpts[0]);
		for (var i=0; i<dietOpts.length - 1; i++) {
			settingsA.url += dietOpts[i] + "%252C%20";
			console.log(settingsA.url);
		}
		settingsA.url += dietOpts[lastOptD];
	}

	if (exclVal.length > 0) {
		settingsA.url += excludeFilter + exclVal;
	}
	console.log(exclVal);

	if (allergyOpts.length > 0) {
		// add to url
		settingsA.url += intoleranceFilter;
		var lastOptA = allergyOpts.length - 1;
		for (var j=0; j < allergyOpts.length -1; i++) {
			settingsA.url += allergyOpts[j] + "%252C%20";
		}
		settingsA.url += allergyOpts[lastOptA];
		console.log(allergyOpts[lastOptA]);
		console.log(allergyOpts[0]);
	}

	settingsA.url += "&number=6&offset=0";

	if (typeOpts.length > 0) {
		// add to url
		settingsA.url += recipeType;
		var lastOptT = typeOpts.length - 1;
		for (var k=0; k < typeOpts.length -1; k++) {
			settingsA.url += typeOpts[k] + "%252C%20";
		}
		settingsA.url += typeOpts[lastOptT]
	}
	console.log(typeOpts);

	settingsA.url += "&query=" + query;
	console.log(settingsA.url);
	console.log(query);
	$.ajax(settingsA).done(function (response) {
		console.log(response);
		console.log(response.totalResults);
		if (response.totalResults === 0){
			// popup if filter options do not create a match
			M.toast({html: 'No results found.'});
		}
		for (var i=0; i < response.results.length; i++) {
			recipeID.push(response.results[i].id);
		}
		var resultsDiv = document.querySelector(".resultsDiv");
		resultsDiv.innerHTML = "";
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

				var split=response.title.split("#");
				var title = split[0];
				for(var i = 1; i < split.length; i++) {
					title = title + '<span class="hashtag">#' + split[i] + '</span>';
				}
				cardTitle.innerHTML = title;
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
}

// new function using "this" with click event to retrieve ID