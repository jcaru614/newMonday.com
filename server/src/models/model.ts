import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const emailRegexChecker = (val: any): boolean => {
    if (/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val)) {
        return true;
    } else {
        return false;
    }
}

export interface Project {
    title: string;
    description: string;
    date: string;
    position: boolean[];
}

export interface User extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    projects: Project[];
}

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name can not be blank."]
    },
    lastName: {
        type: String,
        required: [true, "Last Name can not be blank."]
    },
    email: {
        type: String,
        required: [true, "An email address is required."],
        validate: [emailRegexChecker, "Please enter a valid email address."]
    },
    profilePic: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    projects: [
        {
            title: {
                type: String,
                minlength: [3, 'Title name must be at least 3 characters long']
            },
            description: {
                type: String,
                minlength: [10, 'Description name must be at least 10 characters long']
            },
            image: {
                type: String,
                required: false
            },
            date: {
                type: Date,
                required: [true, 'Date is required']
            },
            position: {
                type: Array<Boolean>(),
                default: [true, false, false]
            },
        }
    ]

}, { timestamps: true });

const UserDB = mongoose.model<User>('User', UserSchema);
export default UserDB;