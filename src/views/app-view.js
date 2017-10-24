/* global Backbone, _ */

'use strict';

import ImageView from '../views/image-view';
import ImageCollection from '../collections/images';
import template from './app-view.handlebars';

const imageCollection = new ImageCollection();

const AppView = Backbone.View.extend({
	el: '#app',
	template,
	initialize() {
		this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
		this.collection.fetch();
	},
	render() {
		const html = template(this.collection.toJSON());
		this.$el.html(html);
		const images = this.$el.find('.content');
		this.collection.models.forEach((image) => {
			const imageView = new ImageView({ model: image });
			const img = imageView.render().$el.first();
			images.append(img.html());
		});
		if (this.collection.models.length > 0) {
			this.carousel();
		}
		return this;
	},
	carousel() {
		// Read necessary elements from the DOM once
		const box = document.querySelector('.carouselbox');
		const next = box.querySelector('.next');
		const prev = box.querySelector('.prev');
		// Define the global counter, the items and the
		// current item
		let counter = 0;
		const items = box.querySelectorAll('.content li');
		const amount = items.length;
		let current = items[0];
		box.classList.add('active');
		// navigate through the carousel
		function navigate(direction) {
			// hide the old current list item
			current.classList.remove('current');

			// calculate th new position
			counter += direction;
			// if the previous one was chosen
			// and the counter is less than 0
			// make the counter the last element,
			// thus looping the carousel
			if (direction === -1 && counter < 0) {
				counter = amount - 1;
			}
			// if the next button was clicked and there
			// is no items element, set the counter
			// to 0
			if (direction === 1 && !items[counter]) {
				counter = 0;
			}
			// set new current element
			// and add CSS class
			current = items[counter];
			current.classList.add('current');
		}
		// add event handlers to buttons
		next.addEventListener('click', () => {
			navigate(1);
		});
		prev.addEventListener('click', () => {
			navigate(-1);
		});
		// show the first element
		// (when direction is 0 counter doesn't change)
		navigate(0);
	},
});

export default new AppView({ collection: imageCollection });
