const hapi = require('hapi');
const mongoose = require('mongoose');

const Shows = require ('./models/shows')
const Users = require ('./models/users')

// handle errors
const errors = (err) => {
    if(err){
        return reply(err).code(404)
    }
}
// find all of a collection
const findAllThings = (things) => {
    return things.find();
}

// find by id
const findTheId = (things, id) => {
    const foundThing = things.findById(id, errors(err))
    return foundThing;
}
// delete by id
const deleteTheThing = (thing, id) => {
    const thingToDelete = thing.findByIdAndRemove(id, errors(err))
    return thingToDelete && 'Item has been deleted'
}
// new show
const newShow = (request) => {
    const {Name, Price, Description, Genre} = request.payload;
    const show = new Shows ({
        Name,
        Price,
        Description,
        Genre
    }); 
    return show.save();
}
// update show by id return the updated show
const updateShow = (request) => {
    const updatedShow = Shows.findByIdAndUpdate(request.params.id, request.payload, errors(err))
    const foundShow = Shows.findById(request.params.id, errors(err))
    return foundShow;
}

// new user
const newUser = (request) => {
    const {Role, Email, Password, Payment, Cart, History} = request.payload;
    const user = new Users ({
        Role,
        Email,
        Password,
        Payment,
        Cart,
        History
    }); 
    return user.save();
}

// update user by id return updated user
const updateUser = (request) => {
    const updatedUser = Users.findByIdAndUpdate(request.params.id, request.payload, errors(err))
    const foundUser = Users.findById(request.params.id, errors(err))
    return foundUser;
}

// new cart

// update cart


// export all functions
module.exports = {
    findAllThings,
    findTheId,
    deleteTheThing,
    newShow,
    updateShow,
    newUser,
    updateUser
}