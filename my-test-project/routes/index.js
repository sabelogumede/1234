var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Add headers
	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		next();
	});
	
	// Views
	app.options('*', (req, res) => res.sendStatus(200) )

	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);

	app.get('/user/:id', [keystone.middleware.api], routes.api.user.getuserId);
	app.get('/user', [keystone.middleware.api], routes.api.user.getusers);
	app.post('/user', [keystone.middleware.api], routes.api.user.create);
	// department
	app.get('/department', [keystone.middleware.api], routes.api.department.getDeps);
	app.post('/department', [keystone.middleware.api], routes.api.department.create); 
	// recipe
	app.get('/recipe/:id', [keystone.middleware.api], routes.api.recipe.getrecipe);
	app.get('/recipe', [keystone.middleware.api], routes.api.recipe.getrecipes);
	app.post('/recipe', [keystone.middleware.api], routes.api.recipe.create);
	app.put('/recipe/:id', [keystone.middleware.api], routes.api.recipe.updateRecipe);
	app.delete('/recipe/:id', [keystone.middleware.api], routes.api.recipe.deleteRecipe);
	
};
