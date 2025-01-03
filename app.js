const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT;
const userRoutes = require('./routes/user.routes');
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// --------------------- passport ---------------------

const expresssession = require('express-session');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const { initalizingPassport } = require('./helpers/passportConfig');
const { getRegister } = require('./controller/user.controller');
app.use(session({
    secret: process.env.PASSPORT_SECRETE, 
    resave: false,
    saveUninitialized: false,
}));
const {
    getloginUser
} = require('./controller/user.controller');

app.get('/', getloginUser);

initalizingPassport(passport);
app.use(expresssession({
    secret: process.env.PASSPORT_SECRETE,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    const errorMsg = req.flash('error');
    res.locals.error_msg = errorMsg.length > 0 ? errorMsg[0] : null;
    next();
});

// ----------------- middlewares -----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connection established successfully...'))
    .catch((err) => console.log(err));


app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
