const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = function(Email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(Email)
};

const UsersSchema = new Schema ({
    Role: {type:  [String] , required: true},
	Username:{type: String, required: true},
	Email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
	Password: {type: String, required: true},
	Payment: String,
	Cart: [ String ],
    History: [ [String] ]
})

module.exports = mongoose.model('Users', UsersSchema);