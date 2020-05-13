import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface User extends mongoose.Document {
    project: String;
    date: String;
    position: Boolean[];
}

export const UserSchema = new Schema({
    project: {
        type: String,
        minlength: [3, 'Project name must be at least 3 characters long']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    position: {
        type: Array<Boolean>(),
        default: [true, false, false]
    },
}, { timestamps: true }); 

const User = mongoose.model<User>('User', UserSchema);
export default User;
