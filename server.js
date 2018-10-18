const hapi = require('hapi');
const mongoose = require('mongoose');



mongoose.connect('mongodb://guest:passw0rd@ds235243.mlab.com:35243/team-this-store',{useMongoClient: true})

mongoose.connection.on('connected', () => {
    console.log('connected to database')
})
mongoose.connection.on('err', (err) => {
    console.log('failed to connect to database',err)
})


const server = hapi.server({
    port: 3000,
    host: 'localhost'
})

const Shows = require ('./models/shows')
const Users = require ('./models/users')
// const Carts = require ('./models/carts')
const ObjectId = mongoose.Types.ObjectId;





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
    await server.start((err)=>{
        if(err){throw err;}
        console.log(`server is running at port ${server.info.port}`)
    });
    console.log (`Server running at: ${server.info.uri}`)
};







init();