const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Shows = require('./shows')

const CartsSchema = new Schema ({
    ProductsInCart:[],
	Subtotal:Number,
    Total: Number,
    AllItemsCount: Number
    // Id: String
})

module.exports = mongoose.model('Carts', CartsSchema);