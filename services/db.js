const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User',{
    phoneNumber: Number,
    username: String,
    password: String,
    todo: []
})

module.exports={
    User
}