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

// const newItem = async(something) => {
//     const result = req.payload
//     let {name, price, description, genre} = req.payload;
//     result.name = something.name;
//     result.price = something.price;
//     result.description = something.description;
//     result.genre = something.genre;
//     const show = new Show({
//         name,
//         price,
//         description,
//         genre
//     });
//    return show.save();
// }

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
        },
        {
            method: 'POST',
            path: '/shows',
            handler: (request, h) => {
                const {name, price, description, genre} = request.payload;
                const show = new Shows ({
                    name,
                    price,
                    description,
                    genre
                }); 
                console.log(show)
               return show.save();
            }
        }
    ]);
    await server.start();
    console.log (`Server running at: ${server.info.uri}`)
};
init();