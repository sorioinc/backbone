/* globals Backbone */

'use strict';

import template from './image-view.handlebars';

const ImageView = Backbone.View.extend({
	template,
	render() {
		const html = template(this.model.toJSON());
		this.$el.html(html);
		return this;
	},
});

export default ImageView;
