/* global Backbone, _ */

'use strict';

import ImageView from '../views/image-view';
import ImageCollection from '../collections/images';
import template from './app-view.handlebars';

const imageCollection = new ImageCollection();

const AppView = Backbone.View.extend({
	el: '#app',
	template,
	events: {
		'click .next': 'nextBlock',
		'click .previous': 'previousBlock',
	},
	carousel: {},
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
			this.setCarousel();
		}
		return this;
	},
	nextBlock() {
		this.navigate(1);
	},
	previousBlock() {
		this.navigate(-1);
	},
	navigate(direction) {
		// hide the old current list item
		this.carousel.current.classList.remove('current');

		// calculate th new position
		this.carousel.counter += direction;
		// if the previous one was chosen
		// and the counter is less than 0
		// make the counter the last element,
		// thus looping the carousel
		if (direction === -1 && this.carousel.counter < 0) {
			this.carousel.counter = this.carousel.amount - 1;
		}
		// if the next button was clicked and there
		// is no items element, set the counter
		// to 0
		if (direction === 1 && !this.carousel.items[this.carousel.counter]) {
			this.carousel.counter = 0;
		}
		// set new current element
		// and add CSS class
		this.carousel.current = this.carousel.items[this.carousel.counter];
		this.carousel.current.classList.add('current');
	},
	setCarousel() {
		// Read necessary elements from the DOM once
		const box = document.querySelector('.carouselbox');
		// Define the global counter, the items and the
		// current item
		this.carousel.counter = 0;
		this.carousel.items = box.querySelectorAll('.content li');
		this.carousel.amount = this.carousel.items.length;
		this.carousel.current = this.carousel.items[0]; // eslint-disable-line prefer-destructuring
		box.classList.add('active');
		// show the first element
		// (when direction is 0 counter doesn't change)
		this.navigate(0);
	},
});

export default new AppView({ collection: imageCollection });
