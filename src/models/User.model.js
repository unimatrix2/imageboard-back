import { Schema, model } from 'mongoose';
import joi from '@hapi/joi';
import AppError from '../errors/AppError';

// MongoDB Schema
const userSchema = new Schema({
    nick: { type: String, required: true, default: 'Anonymous' },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['anon', 'user', 'modmin', 'admin'],
        default: 'anon',
        required: true
    },
    owned_boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
    expiresAt: { type: Date, default: Date.now, index: { expires: '7d' } }
}, { timestamps: true });

// Joi validation schema
const userSchemaValidation = {
    nick: joi.string().min(5).max(20).pattern(/[A-Z0-9a-z!@#%^&*_()[\]{}-]+$/).required(),
    password: joi.string().min(8).max(50).required(),
    role: joi.string().valid('anon', 'user', 'modmin', 'admin'),
}

// Signup Joi Validation trigger
const signupSchema = joi
    .object(userSchemaValidation)
    .options({ abortEarly: false });

// Login Joi Validation trigger
const loginSchema = joi
    .object({ nick: userSchemaValidation.nick, password: userSchemaValidation.password })
    .options({ abortEarly: false });

// Signup Joi validator & error handler
export const validateSignupParams = (req, res, nxt) => {

    // Stores validation result
    const joiValidation = signupSchema.validate(req.body);

    // Handles error so route can return proper message
    if (joiValidation.error) {
        const error = joiValidation.error.details.reduce((acc, err) => {
            acc[err.context.label] = err.message;
            return acc;
        }, {});
        throw new AppError({
            message: error,
            type: 'Signup-Validate-Error',
            status: 400
        });
    }
    return nxt();
};

export const validateLoginParams = (req, res, nxt) => {
    const joiValidation = loginSchema.validate(req.body);
    if (joiValidation.error) {
        const error = joiValidation.error.details.reduce((acc, err) => {
            acc[err.context.label] = err.message;
            return acc;
        }, {});
        throw new AppError({
            message: error,
            type: 'Login-Validate-Error',
            status: 400
        });
    }
    return nxt();
};

export const User = model('User', userSchema);