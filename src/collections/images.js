/* globals Backbone */

import Image from '../models/image';

const ImageList = Backbone.Collection.extend({
	model: Image,
	url: 'http://www.splashbase.co/api/v1/images/latest',
	parse(response) {
		return response.images;
	},
});

export default ImageList;
