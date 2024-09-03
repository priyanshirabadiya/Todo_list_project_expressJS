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
// --------------------- passport ---------------------

const expresssession = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const { initalizingPassport } = require('./helpers/passportConfig')
initalizingPassport(passport);
app.use(expresssession({ 
    secret: process.env.PASSPORT_SECRETE, 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// app.use((req, res, next) => {
//     res.locals.errorMessage = req.flash('there is an error...');
//     res.locals.successMessage = req.flash('success');
//     next();
// });

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// -----------------------------------------------------

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connection established successfully...'))
    .catch((err) => console.log(err));

app.get("/", userRoutes);

app.use('/user', userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
