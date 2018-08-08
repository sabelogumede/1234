keystone = require('keystone');
Recipe = keystone.list('Recipe');

// get getrecipes of recipe 

exports.getrecipes = function(req, res) {
	Recipe.model.find()
    .exec(function(err, recipes) {
		// do something with recipe
		// create an array 
		let results = []; 
		if (err) return res.apiError('database error', err);
		//loop through recipes and ad to result 
		for (var i = 0; i < recipes.length; i++){
			results.push({
				title: recipes[i].title,
				article: recipes[i].article,
				author: recipes[i].author,
				img: recipes[i].img,
				buttontext: recipes[i].buttontext
			  })
		}
		res.apiResponse(
			//return result 
			results
		);
	});

}

// update recipe item/id
exports.updateRecipe = function(req, res) {
	// 
	Recipe.model.findById(req.params.id)
	.exec(function(err, recipe) {
		// do something with users
		if (err) return res.apiError('database error', err);
		if (!recipe) return res.apiError('not found');

		var data = req.body;
		// console.log(data)

		recipe.getUpdateHandler(req).process(data, function(err) {

			if (err) return res.apiError('create error', err);

			res.apiResponse(
				recipe
			);
		});
	});

}
		
// get recipe by id

exports.getrecipe = function(req, res) {
	// find by (title search )!!
	Recipe.model.findById(req.params.id)
	.exec(function(err, recipe){
		// do something with users
		if (err) return res.apiError('database error', err);
		res.apiResponse({
		 title: recipe.title,
		 article: recipe.article,
		 img: recipe.img,
		 buttontext: recipe.buttontext
		 //  author: recipe.author
		});
	});
}


// creating a new user

exports.create = function(req, res) {
	console.log("created new recipe");
	console.log(req.body);
	
	var newRecipe = new Recipe.model({
		title: req.body.title,
		article: req.body.article,
		img: req.body.img,
		buttontext: req.body.buttontext
	});

	newRecipe.save(function(err) {	
		// if (err) return res.apiError('database error', err);
		console.log("created new recipe");
	});

	return res.apiResponse("created new recipe");
}

// delete a recipe by id 
exports.deleteRecipe = function(req, res) {

	Recipe.model.findById(req.params.id)
	.exec(function(err, recipe){
	// do something with users
	if (err) return res.apiError('database error', err);
	if (!recipe) return res.apiError('not found');

		recipe.remove(function (err) {
			if (err) return res.apiError('database error', err);

			res.apiResponse({
				success: true
			});
		});

	});

 }
