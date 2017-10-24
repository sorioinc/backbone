/* globals Backbone */

'use strict';

import template from './image-view.handlebars';

const ImageView = Backbone.View.extend({
	template,
	render() {
		const image = this.getRandomPic();
		const html = template(image);
		this.$el.html(html);
		return this;
	},
	getRandomPic() {
		const model = this.model.toJSON();
		const image = model.images[Math.floor(Math.random() * model.images.length)];
		return {
			title: model.title,
			url: image.url,
		};
	},
});

export default ImageView;
