const hapi = require('hapi');
const mongoose = require('mongoose');

const Shows = require ('./models/shows')
const Users = require ('./models/users')
const Carts = require('./models/carts')


// find all of a collection
const findAllThings = (things) => {
    return things.find();
}
// find by id
const findTheId = (things, id, reply) => {
    // const foundThing = things.findById(id, errors(err, data))
    const foundThing = things.findById(id, (err, data)=>{
        if(err){return reply(err).code(404)}
    })
    return foundThing;
}
// delete by id
const deleteTheThing = (thing, id, reply) => {
    const thingToDelete = thing.findByIdAndRemove(id, (err, data)=>{
        if(err){return reply(err).code(404)}
    })
    return thingToDelete && 'Item has been deleted'
}

// new show
const newShow = (request) => {
    const {name, price, description, genre} = request.payload;
    const show = new Shows ({
        name,
        description,
        price,
        genre
    }); 
    return show.save();
}
// update show by id return the updated show
const updateShow = (request, reply) => {
    const updatedShow = Shows.findByIdAndUpdate(request.params.id, request.payload, (err, data)=>{
        if(err){return reply(err).code(404)}})
    const foundShow = Shows.findById(request.params.id, (err, data)=>{
        if(err){return reply(err).code(404)}})
    return foundShow;
}

// new user
const newUser = (request) => {
    const {Role, Email, FirstName, LastName, Password, Payment, Cart, History} = request.payload;
    const user = new Users ({
        Role,
        Email,
        FirstName,
        LastName,
        Password,
        Payment,
        Cart,
        History
    }); 
    return user.save();
}

// update user by id return updated user
const updateUser = (request, reply) => {
    const updatedUser = Users.findByIdAndUpdate(request.params.id, request.payload, (err, data)=>{
        if(err){return reply(err).code(404)}})
    const foundUser = Users.findById(request.params.id, (err, data)=>{
        if(err){return reply(err).code(404)}})
    return foundUser;
}

// new cart
const newCart = (request) => {
    const {ProductsInCart, Subtotal, Total} = request.payload;
    const cart = new Carts ({
        ProductsInCart,
        Subtotal,
        Total,
    }); 
    return cart.save();
}
// update cart
const updateCart = (request, reply) => {
    const updatedCart = Carts.findByIdAndUpdate(request.params.id, request.payload, (err, data)=>{
        if(err){return reply(err).code(404)}})
    const foundCart = Carts.findById(request.params.id, (err, data)=>{
        if(err){return reply(err).code(404)}})
    return foundCart;
}

// export all functions
module.exports = {
    findAllThings,
    findTheId,
    deleteTheThing,
    newShow,
    updateShow,
    newUser,
    updateUser,
    newCart,
    updateCart
}