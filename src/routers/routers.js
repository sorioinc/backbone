/* global Backbone, $ */

'use strict';

import view from '../views/app-view';

const Router = Backbone.Router.extend({
	routes: {
		home: 'home',
		'*path': 'home',
	},

	home() {
		$('#carousel').append(view.render().$el);
	},

	initialize() {
		this.home();
		Backbone.history.start();
	},
});

export default Router;
