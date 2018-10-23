// required imports
const hapi = require('hapi');
const mongoose = require('mongoose');
const controls = require ('./Control')
// const passport = require('passport')


// setting up mongoose
mongoose.connect('mongodb://guest:passw0rd@ds235243.mlab.com:35243/team-this-store',{useMongoClient: true})
mongoose.connection.on('connected', () => {
    console.log('connected to database')
})
mongoose.connection.on('err', (err) => {
    console.log('failed to connect to database',err)
})


// Starting the hapi server
const server = hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {cors:true}
    
})

// setting up the required schemas and modles in this file
const Shows = require ('./models/shows')
const Users = require ('./models/users')
const Carts = require ('./models/carts')
// const ObjectId = mongoose.Types.ObjectId;
// const login = require('./models/login')

// passport.initialize()

// behavior for the server on start up
const init = async() => {

// SERVER ROUTES
    server.route([
// start page
        {method: 'GET',
        path: '/',
        handler: function (request, reply) {
            return `<h1>Hello there</h1>`
        }
    },

//SHOWS 
        //get the shows
        {
            method: 'GET',
            path: '/shows',
            handler: (req, reply) => {
                return controls.findAllThings(Shows)
            }
        },
        //get shows by id
        {
            method: 'GET',
            path: '/shows/{id}',
            handler: (request, reply) => {
                return controls.findTheId(Shows, request.params.id, reply);
            }
        },
        // create a new show in the database
        {
            method: 'POST',
            path: '/shows',
            handler: (request, reply) => {
            return controls.newShow(request);
            }
        },
        //update Shows by id
        {
            method: 'PUT',
            path: '/shows/{id}',
            handler: (request, reply) => {
                return controls.updateShow(request);
            }

        },
        // delete show by id
        {
            method: 'DELETE',
            path: '/shows/{id}',
            handler: (request, reply) => {
                // const foundShow = Shows.findByIdAndRemove( request.params.id,(err,Shows)=>
                // {if(err){return reply(err).code(404)} })
                    
                // return foundShow && 'Show has been deleted!'
                return controls.deleteTheThing(Shows, request.params.id)
            }
        },
// USERS 
        //get the users
        {
            method: 'GET',
            path: '/users',
            handler: (req, reply) => {
                return controls.findAllThings(Users);
            }
        },
        //get users by id
        {
            method: 'GET',
            path: '/users/{id}',
            handler: (request, reply) => {
                return controls.findTheId(Users, request.params.id, reply)
            }
        },
        // create a new user in the database
        {
            method: 'POST',
            path: '/users',
            handler: (request, reply) => {
                return controls.newUser(request)
            }
        },
        //update users by id
        {
            method: 'PUT',
            path: '/users/{id}',
            handler: (request, reply) => {
                return controls.updateUser(request)
            }

        },
        // delete user by id
        {
            method: 'DELETE',
            path: '/users/{id}',
            handler: (request, reply) => {
                return controls.deleteTheThing(Users, request.params.id)
            }
        },
        
// Carts
                //get the carts
                {
                    method: 'GET',
                    path: '/carts',
                    handler: (req, reply) => {
                        return controls.findAllThings(Carts);
                    }
                },
                //get cart by id
                {
                    method: 'GET',
                    path: '/carts/{id}',
                    handler: (request, reply) => {
                        return controls.findTheId(Carts, request.params.id, reply)
                    }
                },
                // create a new cart in the database
                {
                    method: 'POST',
                    path: '/carts',
                    handler: (request, reply) => {
                        return controls.newCart(request)
                    }
                },
                //update cart by id
                {
                    method: 'PUT',
                    path: '/carts/{id}',
                    handler: (request, reply) => {
                        return controls.updateCart(request)
                    }
        
                },
                // delete cart by id
                {
                    method: 'DELETE',
                    path: '/carts/{id}',
                    handler: (request, reply) => {
                        return controls.deleteTheThing(Carts, request.params.id)
                    }
                },
    ]);
    // Server stuff
    await server.start((err)=>{
        if(err){throw err;}
        console.log(`server is running at port ${server.info.port}`)
    });
    console.log (`Server running at: ${server.info.uri}`)
};
// run the server startup stuff
init();