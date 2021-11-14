const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcrypt-nodejs");
const dotenv = require("dotenv");

dotenv.config();

const Users = require('./../models/Users');

passport.use(new Strategy({usernameField: 'email'},
    (email, password, done) => {
        Users.findOne({email: email}, function (err, foundUser) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!foundUser) {
                return done(null, false, {message: 'Invalid credentials.\n'});
            }
            if (!bcrypt.compareSync(password, foundUser.password)) {
                return done(null, false, {message: 'Invalid credentials.\n'})
            }
            return done(null, foundUser)
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    Users.findById(id, function (err, foundUser) {
        if (err) {
            return done(err, false)
        }
        return done(null, foundUser)
    });
});
