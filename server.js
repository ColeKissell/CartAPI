const hapi = require('hapi');
const mongoose = require('mongoose');

const server = hapi.server({
    port: 3000,
    host: 'localhost'
})

const Shows = require ('./shows')
const Users = require ('./users')
// const Carts = require ('./carts')
const ObjectId = mongoose.Types.ObjectId;


const promise =mongoose.connect('mongodb://guest:passw0rd@ds235243.mlab.com:35243/team-this-store',{useMongoClient: true})

mongoose.connection.once('open', () => {
    console.log('connected to database')
})


const init = async() => {
    server.route([
        // start page
        {method: 'GET',
        path: '/',
        handler: function (request, reply) {
            return `<h1>Hello there</h1>`
        }
    },
        // get all shows
        {
            method: 'GET',
            path: '/shows',
            handler: (req, reply) => {
                return Shows.find();
            }
        },
        // create a new show in the database
        {
            method: 'POST',
            path: '/shows',
            handler: (request, h) => {
                const {Name, Price, Description, Genre} = request.payload;
                const show = new Shows ({
                    Name,
                    Price,
                    Description,
                    Genre
                }); 
                console.log(show)
               return show.save();
            }
        },
        //find show by id
        {
            method: 'GET',
            path: '/shows/{id}',
            handler: (request, h) => {
                const foundShow = Shows.findById( request.params.id,(err,Shows)=>
                {if(err){return h(err).code(404)} })
                    
                return foundShow
            
            }
        },
        //get the users
        {
            method: 'GET',
            path: '/users',
            handler: (req, reply) => {
                return Users.find();
            }
        },

        // create a new user in the database
        {
            method: 'POST',
            path: '/users',
            handler: (request, h) => {
                const {Role, Username, Email, Password, Payment, Cart, History} = request.payload;
                const user = new Users ({
                    Role,
                    Username,
                    Email,
                    Password,
                    Payment,
                    Cart,
                    History
                }); 
                console.log(user)
               return user.save();
            }
        },
        {
            method: 'PUT',
            path: '/users/{id}',
            handler: (request, h) => {
                const updatedUser = Users.findByIdAndUpdate(request.params.id, request.payload, (err, data)=>{
                    if(err){return h(err).code(404)}

                })
                const foundUser = Users.findById(request.params.id, (err, data)=>{
                    if(err){return h(err).code(404)}
                })
                return foundUser;
            }

        },
        {
            method: 'GET',
            path: '/users/{id}',
            handler: (request, h) => {
                const foundUser = Users.findById(request.params.id, (err, data)=>{
                    if(err){return h(err).code(404)}
                })
                return foundUser;
            }
        },
        {
            method: 'DELETE',
            path: '/users/{id}',
            handler: (request, h) => {
                const foundUser = Users.findByIdAndRemove( request.params.id,(err,Users)=>
                {if(err){return h(err).code(404)} })
                    
                return foundUser && 'User has been deleted!'
            
            }
        },
        


    ]);
    await server.start();
    console.log (`Server running at: ${server.info.uri}`)
};







init();