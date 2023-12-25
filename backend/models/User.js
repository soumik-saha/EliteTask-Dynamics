const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contactNo: { type: Number, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
