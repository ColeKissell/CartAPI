const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartsSchema = new Schema ({
    ProductsInCart:[{Shows}],
	Subtotal:[Number],
	Total:[Number],
    Id: String
})

module.exports = mongoose.model('Carts', CartsSchema);