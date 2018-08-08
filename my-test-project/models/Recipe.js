var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Recipe Model
 * ==========
 */

var Recipe = new keystone.List('Recipe');

Recipe.add({
	title: { type: String, required: true, initial: true, index: true },
	article: { type: String, required: true, initial: true, index: true },
	img: { 
		type: String,
		required: true, 
		initial: true, 
		index: true,
	},
	author: { type: String, initial: true, index: true },
	buttontext: { type: String, required: true, initial: true, index: true }
});


/**
 * Registration
 */
Recipe.defaultColumns = 'title, article, author, img, buttontext';
Recipe.register();
