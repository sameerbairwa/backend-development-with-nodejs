const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
    },
    username: {
        type: String,
        required: true,
        max: 50

    },
    website: {
        type: String
    },
    country: {
        type: String
    },
    language: {
        type: [String],
        required: true
    },
    portfolio: {
        type: String
    },
    workrole: [{
        role: {
            type: String,
            required: true
        },
        company: {
            type: String
        },
        country: {
            type: String
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        current: {
            type: Boolean,
            default: false
        },
        details: {
            type: String
        }
    }],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }

    }
});

module.exports = profile = mongoose.model("myProfile", profileSchema);