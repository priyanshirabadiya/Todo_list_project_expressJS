const localStrategy = require('passport-local').Strategy;
const User = require('../model/user.model'); 
const bcrypt = require('bcrypt'); 
exports.initalizingPassport = (passport) => {
    passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'No user found.' });

            const comparepassword = await bcrypt.compare(password, user.password);
            if (!comparepassword) return done(null, false, { message: 'Incorrect email or password please provide valid email or password.' });

            return done(null, user);
        } catch (error) {
            console.log("error in passport JS", error);
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    })

}
