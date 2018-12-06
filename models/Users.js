var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true
    },
    password:{
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('users', UserSchema, 'users');

module.exports = {
    findUser: async(id)=>{
       return await User.findOne({ _id: id });
    }
}