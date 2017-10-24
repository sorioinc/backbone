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
		'click .prev': 'previousBlock',
	},
	carousel: {},
	controls: {},
	blocks: [],
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
			const img = this.renderBlock(imageView);
			this.blocks.push({
				view: imageView,
				el: img,
			});
			images.append(img);
		});

		this.controls.next = this.$el.find('.next');
		this.controls.previous = this.$el.find('.prev');

		if (this.collection.models.length > 0) {
			this.setCarousel();
		}

		return this;
	},
	renderBlock(view) {
		return view
			.render()
			.$el.wrap('<li></li>')
			.parent();
	},
	enableTarget(target) {
		target.prop('disabled', false);
	},
	disableTarget(target) {
		target.prop('disabled', true);
	},
	nextBlock() {
		this.navigate(1);
	},
	previousBlock() {
		this.navigate(-1);
	},
	navigate(direction) {
		this.carousel.current.classList.remove('current');

		this.carousel.counter += direction;

		if (this.carousel.counter === 0) {
			this.disableTarget(this.controls.previous);
		}
		if (this.carousel.items.length - 1 === this.carousel.counter) {
			this.disableTarget(this.controls.next);
		}
		if (this.carousel.counter > 0 && this.carousel.counter < this.carousel.items.length - 1) {
			this.enableTarget(this.controls.next);
			this.enableTarget(this.controls.previous);
		}

		const view = this.blocks[this.carousel.counter].view; // eslint-disable-line prefer-destructuring
		this.blocks[this.carousel.counter].el.find('li').html(view.render().$el.html());

		this.carousel.current = this.carousel.items[this.carousel.counter];
		this.carousel.current.classList.add('current');
	},
	setCarousel() {
		const box = document.querySelector('.carouselbox');

		this.carousel.counter = 0;
		this.carousel.items = box.querySelectorAll('.content li');
		this.carousel.amount = this.carousel.items.length;
		this.carousel.current = this.carousel.items[0]; // eslint-disable-line prefer-destructuring
		box.classList.add('active');

		this.navigate(0);
	},
});

export default new AppView({ collection: imageCollection });
