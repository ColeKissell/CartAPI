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

// update show by id


// new user

// update user by id


// new cart

// update cart


// export all functions
module.exports = {
    findAllThings,
    findTheId,
    deleteTheThing
}