import passport_local from 'passport-local';
const LocalStrategy = passport_local.Strategy;
import bcrypt from 'bcryptjs';

// Load User Model
import UserDB from '../models/model';

module.exports = function (passport: any) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match User
            UserDB.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password incorrect' });
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: any, done: any) => {
        UserDB.findById(id, (err, user) => {
            done(err, user);
        });
    });
}