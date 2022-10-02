const mongoose = require('mongoose');

const newUser = new mongoose.Schema({
    user_id: { type: Number, default: Math.random() * 10000 },
    reg_on: { type: Date, default: Date.now() },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    profile_photo: { type: String, default: 'pic-1', enum: ['pic-1', 'pic-2', 'pic-3', 'pic-4', 'pic-5'] },
    password: { type: String, default: '' },
    user_online: { type: Boolean, default: false }

})

module.exports = mongoose.model("INTELLI_TASK", newUser, "User");
