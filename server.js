const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server({
	connections: {
		routes: {
			files: {
				relativeTo: Path.join(__dirname, ''),
			},
		},
	},
});
server.connection({ port: process.env.PORT || 3000 });

server
	.register(Inert)
	.then(() => {
		server.route({
			method: 'GET',
			path: '/{path*}',
			handler: {
				directory: {
					path: '.',
					redirectToSlash: true,
					index: true,
				},
			},
		});

		server.ext('onPreResponse', (request, reply) => {
			const { response } = request;

			if (!response.isBoom) {
				return reply.continue();
			}

			const error = response;

			if (error.output.statusCode === 404) {
				return reply.file('index.html');
			}
		});

		return server.start();
	})
	.then(() => {
		console.log('Server running at:', server.info.uri);
	})
	.catch((err) => {
		throw err;
	});
