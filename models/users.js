const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require ('mongoose-type-email')


const UsersSchema = new Schema ({
    Role: String,
	Email: {type: mongoose.SchemaTypes.Email, required: true},
    FirstName: String,
    LastName: String,
	Password: {type: String, required: true},
	Payment: String,
	Cart: [ String ],
    History: [ [String] ]
})

module.exports = mongoose.model('Users', UsersSchema);