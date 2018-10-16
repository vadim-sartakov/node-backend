import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const loginSchema = new Schema({
    confirmedAt: Date,
    login: {
        type: String,
        lowercase: true,
        required: true
    }
}, { _id: false });
loginSchema.index({ login: 1 }, { unique: true, sparse: true });

export const localSchema = new Schema({
    logins: [loginSchema],
    passwordHash: {
        type: String,
        required: true
    }
}, { _id: false });
localSchema.virtual("password").set(function(password) {
    const salt = bcrypt.genSaltSync(10);
    this.passwordHash = bcrypt.hashSync(password, salt);
});

export const windowsAccountSchema = new Schema({
    username: String,
    userSid: {
        type: String,
        required: true
    },
}, { _id: false });
windowsAccountSchema.index({ userSid: 1 }, { unique: true, sparse: true });

export const oAuth2AccountSchema = new Schema({
    provider: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, { _id: false });
oAuth2AccountSchema.index({ provider: 1, id: 1 }, { unique: true, sparse: true });