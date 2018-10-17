const hapi = require('hapi');
const mongoose = require('mongoose');

const server = hapi.server({
    port: 3000,
    host: 'localhost'
})

const Shows = require ('./shows')


mongoose.connect('mongodb://guest:passw0rd@ds235243.mlab.com:35243/team-this-store')

mongoose.connection.once('open', () => {
    console.log('connected to database')
})

const init = async() => {
    server.route([
        {method: 'GET',
        path: '/',
        handler: function (request, reply) {
            return `<h1>Hello there</h1>`
        }
    },
        {
            method: 'GET',
            path: '/shows',
            handler: (req, reply) => {
                return Shows.find();
            }
        }
    ]);
    await server.start();
    console.log (`Server running at: ${server.info.uri}`)
};
init();