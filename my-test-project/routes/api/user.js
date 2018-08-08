keystone = require('keystone');
User = keystone.list('User');

// get getusers of users 
exports.getusers = function(req, res) {
	User.model.find()
    .exec(function(err, users) {
		// do something with users
		// create an array 
		let results = []; 
		if (err) return res.apiError('database error', err);
		//loop through users and ad to result 
		for (var i = 0; i < users.length; i++){
			results.push({
				id: users[i]._id,
				email: users[i].email,
				firstName: users[i].name.first,
				lastName: users[i].name.last,
				isAdmin: users[i].isAdmin,
			  })
		}
		res.apiResponse(
			//return result 
			results
		);
	});
}

// get user by id
exports.getuserId = function(req, res) {
		User.model.findById(req.params.id)
	.exec(function(err, user){
		// do something with users
		if (err) return res.apiError('database error', err);
		if (!user) return res.apiError('not found');
		res.apiResponse({
		  id: user._id,
		  email: user.email,
		  firstName: user.name.first,
		  lastName: user.name.last,
		});
	});
}

// creating a new user
exports.create = function(req, res) {
	console.log("created new user");
	console.log(req.body);
	
	var newUser = new User.model({
		password: req.body.password,
		email: req.body.email,
		isAdmin: req.body.isAdmin,
		name:  req.body.name  
	});

	newUser.save(function(err) {	
	console.log("created new user");

	});

	return res.apiResponse(null);
} 

