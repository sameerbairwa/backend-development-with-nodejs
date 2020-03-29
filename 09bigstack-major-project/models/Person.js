const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonSchema = new Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    username:{
        type: String,
    },
    profilepic:{
        type: String,
        default:"https://learcodeonline.in/maincon.png"
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = Person = mongoose.model("myPerson", PersonSchema);
