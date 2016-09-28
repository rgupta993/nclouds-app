var config = require('./config.js')[process.env.NODE_ENV || 'development'];

var knex = require('knex')({
	client: 'mysql',
	connection: {
		host		: config.mysql.host,
		port 		: config.mysql.port,
		user		: config.mysql.user,
		password	: config.mysql.password,
		database	: config.mysql.db
	},
	debug: (process.env.NODE_ENV || 'development') === 'development'
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports = bookshelf;
