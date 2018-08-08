var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var Department = new keystone.List('Department', {
	autokey: { from: 'title', path: 'key', unique: true },
});

Department.add({
	title: { type: String, required: true, initial: true },
	description: { type: String, required: true, initial: true},
	depHead: { type: Types.Relationship, ref: 'User', index: true },
	members: { type: Types.Relationship, ref: 'User', index: true , many: true },
});

Department.register();
