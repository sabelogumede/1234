keystone = require('keystone');
Department = keystone.list('Department');

// get getDepartments of deb 
exports.getDeps = function(req, res) {
	Department.model.find()
	.populate('members')
    .exec(function(err, department) {
		// do something with departments
		// create an array

		let results = []; 
		if (err) return res.apiError('database error', err);
		//loop through users and ad to result 
		for (var i = 0; i < department.length; i++){
			console.log( department[i].members);
			results.push({
				id: department[i]._id,
				title: department[i].title,
				description: department[i].description,
				depHead: department[i].depHead,
				members: department[i].members,
			  })
		}
		res.apiResponse(
			//return result 
			results
		);
	});

}


// creating a new department
exports.create = function(req, res) {
	console.log("created new department");
	console.log(req.body);
	
	var newDep = new Department.model({
		title: req.body.title,
		description: req.body.description,
		// depHead: req.body.depHead,
		// members:  req.body.members  
	});

	newDep.save(function(err) {	
	console.log("created new department");

	});

	return res.apiResponse(null);
}
