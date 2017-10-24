/* globals Backbone */

import Image from '../models/image';

const ImageList = Backbone.Collection.extend({
	model: Image,
	url: 'http://www.splashbase.co/api/v1/images/search?query=buildings',
	parse(response) {
		const blocks = [];
		const blockSize = response.images.length / 4;
		let block = 1;
		while (response.images.length > 0 && block <= 4) {
			blocks.push({
				title: `Block ${block}`,
				images: response.images.splice(0, blockSize),
			});
			block++;
		}
		return blocks;
	},
});

export default ImageList;
