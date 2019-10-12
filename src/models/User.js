const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        min: 6,
        max: 256
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
          delete ret.password;;
        }
      }
});
module.exports = mongoose.model('User', UserSchema);