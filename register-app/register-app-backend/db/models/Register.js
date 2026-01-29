import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        rePassword: {type: String, required: true},
        country: {type: String, required: true},
        city: {type: String, required: true},
        address: {type: String},
    },
    {timestamps: true}
);

export const Register = mongoose.model('Register', registerSchema);