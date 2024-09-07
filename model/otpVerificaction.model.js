const mongoose = require('mongoose');

const otpVerificationSchema = mongoose.Schema({
    userId: String,
    otp: String
}, {
    timestamps: true
})

module.exports = mongoose.model('otpVerification' , otpVerificationSchema);

