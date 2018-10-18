const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema ({
    Role: [ String ],
	Username: String,
	Email: String,
	Password: String,
	Payment: String,
	Cart: [ Shows ],
    History: [ [Shows] ]
})

module.exports = mongoose.model('Users', UsersSchema);