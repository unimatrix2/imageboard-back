import AppError from '../errors/AppError';
import { User } from '../models/User.model';
import { roleToDateHandler } from '../utils/roleExpiryHandler';

export const createUser = async user => {
    try {
        // Creates a new user via model & awaits saving the user to DB
        const newUser = new User(user);
        await newUser.save();
        // Returns only relevant & non sentitive info
        return { id: newUser.id, nick: newUser.nick, role: newUser.role };
    } catch (err) {
        // This keyValue will tell which field failed to validate
        throw new AppError({
            message: Object.keys(err.keyValue),
            type: 'Error-Create-User',
            status: 400
        });
    };
};

export const findUser = async (id, role) => {
    try {
        // This is rigged this way because failure will result in error
        // (like non existent user)
        // But success means the returned user will have expiry date updated
        // Without resorting to a second DB query
        const user = await updateUserExpiry(id, role);
        return { nick: user.nick, id: user._id, role: user.role };
    } catch (error) {
        throw new AppError({
            message: 'User not found',
            type: 'User-Find',
            status: 404
        });
    };
};

export const updateUserExpiry = async (id, role) => {
    try {
        // Will get a user and update it's expiry date according to user role
        const user = await User.findByIdAndUpdate(id, { expiresAt: roleToDateHandler(role) }, { new: true }); 
        // Will return the user already updated
        return user;
    } catch (error) {
        throw new AppError({
            message: 'Could not update user expiry',
            type: 'User-Update-Expiry',
            status: 400
        });
    };
};