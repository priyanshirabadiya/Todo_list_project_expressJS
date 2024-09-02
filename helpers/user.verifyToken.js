const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.verifyToken = async (req, res , next ) => {
    try {
        let authentication = req.headers['authorization'];
        // console.log(authentication);

        if (!authentication) {
            return res.send("Not authentication");
        }
        let token = authentication.split(" ")[1];
        let { userId } = await jwt.verify(token, process.env.JWT_SECRETE);
        let user = await User.findOne({ _id: userId, isDelete: false });
        if (!user) {
            return res.send("User not found...");
        }
        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        res.send("Internal server error...");
    }
}

