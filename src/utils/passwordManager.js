import { generate } from 'generate-password';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';

export const generator = () => generate({
    numbers: true,
    symbols: true,
    excludeSimilarCharacters: true,
    exclude: '.$'
});

export const encrypt = async textPwd => {
    const pwd = await hash(textPwd, 10);
    return pwd;
};

export const verify = async (textPwd, hash) => {
    try {
        const validation = await compare(textPwd, hash);
        return validation;
    } catch (error) {
        throw new AppError({
            message: 'Incorrect Password',
            type: 'Wrong-Passwd',
            status: 401
        });
    };
    
};

export const authenticate = user => {
    if (user) {
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );
        return token;
    } else {
        throw new AppError({
            message: 'No user ID provided',
            type: 'No-Auth',
            status: 400
        })
    }
    
};

export const verifyToken = async token => {
    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        return verified;
    } catch (e) {
        throw new AppError({ message: 'Expired or Invalid Token', type: 'No-Auth', status: 401 });
    }
};