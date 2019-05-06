const express = require('express');
const authRoutes = require('./routes/oauth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const app = express();
const passport = require('passport');

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookieKey]
}));


app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log("connected to mongodb");
})

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res)=>{
    res.render('home',{user:req.user});
   
})

app.listen(3000, ()=>{
    console.log('3000 onn hai boss !!')
});