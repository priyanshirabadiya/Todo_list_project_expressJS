const Otp = require('../model/otpVerificaction.model');
const User = require('../model/user.model')

const bcrypt = require('bcrypt');
const passport = require('passport');
const otpgenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: process.env.GMAIL_PORT,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
})

exports.enterEmail = (req, res) => {
    res.render('enteremailpage');
}

exports.otpVerificationalEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const mailotp = `${Math.floor(1000 + Math.random() * 9000)}`;
        req.session.userId = user._id;
        const otpGenerator = require('otp-generator')

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Verify your email",
            html: `<p>Enter <b>${mailotp}</b> in the app to verify your email address and complete the process.</p>`
        };

        // Hash the OTP
        const hashedOtp = await bcrypt.hash(mailotp, 10);
        console.log("Generated OTP:", mailotp);
        console.log("Hashed OTP:", hashedOtp);

        await Otp.create({
            userId: user._id,
            otp: hashedOtp
        });

        // send email
        await transport.sendMail(mailOptions);

        res.render('verifyotp');

    } catch (error) {
        console.log("OTP error:", error);
        res.status(500).send('Internal server error');
    }
};

exports.getotp = async (req, res) => {
    try {
        let ans = await Otp.find();
        res.json({ ans });
    } catch (error) {
        console.log(error);

    }
}

exports.verifyOTProute = async (req, res) => {
    const { otp } = req.body;
    const userId = req.session.userId;

    try {
        const otpRecord = await Otp.findOne({ userId }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP or User ID' });
        }

        console.log("Provided OTP:", otp);
        console.log("Stored OTP Hash:", otpRecord.otp);
        const isValid = await bcrypt.compare(otp, otpRecord.otp);

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        res.redirect('/user/reset-password');

    } catch (error) {
        console.log('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.resetPasswordFinally = (req, res) => {
    res.render('resetPassword');
}

exports.setNewPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.session.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = hashedPassword;
        await user.save();

        // clear the userId from the session storage
        req.session.userId = null;

        res.json({ message: 'Password has been successfully reset' });
    } catch (error) {
        console.log('Error for resetting password :', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
