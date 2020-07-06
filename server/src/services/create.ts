import { Request, Response } from 'express';
import UserDB, { User } from '../models/model';
import WebUtil from '../utils/webUtil';
import * as Constants from '../utils/constants';
import EMAIL from '../utils/emailUtil';
import bcrypt from 'bcryptjs';


class Create {
    public create = (req: Request, res: Response): void => {

        const { firstName, lastName, email, password, confirmPassword } = req.body;
        let errors = [];

        // Check required fields
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            errors.push({ msg_req_fields: 'Please fill in all fields' });
        }

        // Check password match
        if (password !== confirmPassword) {
            errors.push({ msg_pass_match: "Password do not match" });
        }

        // Check password length
        if (password.length < 8) {
            errors.push({ msg_pass_length: 'Password should be at least 8 characters' });
        }

        if (errors.length > 0) {
            console.log(errors);
        } else {
            UserDB.findOne({ email: email })
                .then(user => {
                    if (user === null) {
                        const newUser = new UserDB({ firstName, lastName, email, password });
                        // console.log('first stop',newUser);
                        // Hash Password
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                // Set password to hashed
                                newUser.password = hash;
                                // Save user
                                newUser.save()
                                    .then(user => {
                                        // req.flash('success_msg', 'You are now register');
                                        // console.log('second stop',newUser)
                                        console.log('User succesfully created!')
                                        EMAIL.send(user)
                                        WebUtil.successResponse(res, user, Constants.ACCOUNT_CREATED, 200)
                                    })
                                    .catch((createError: any) => WebUtil.errorResponse(res, createError, Constants.SERVER_ERROR, 500))
                            }))
                    } else {
                        // User exists
                        errors.push({ msg_email_exist: 'Email is already register' });
                        WebUtil.response(res, Constants.ACCOUNT_EXISTS, 400);
                    }
                })
                .catch(error => WebUtil.errorResponse(res, error, Constants.CLIENT_ERROR_AE, 400))
        }
    }
}

export default new Create();

// UserDB.create({
//     firstName: "test",
//     lastName: "test",
//     email: "test@test.com",
//     password: "test1234567890",
//     confirmPassword:"test1234567890"
// })

var str = 'ee'
    console.log(str.split('rr').join('tt'))