import {
	generator,
	encrypt,
	authenticate,
	verifyToken,
} from '../utils/passwordManager';
import { createUser, findUser } from '../repositories/user.repository';
import AppError from '../errors/AppError';

export const createAnon = async () => {
	try {
		// Generates anon user with random password
		const anon = {
			nick: 'Anonymous',
			password: generator(),
			role: 'anon',
		};
		// Writes the user to DB
		const createdUser = await createUser({ ...anon, password: await encrypt(anon.password) });
		// Returns a JWT and a user object (user will need sensitive info at first)
		return { token: authenticate(createdUser), anon };
	} catch (error) { throw new AppError(error); }
};

export const verifyUserToken = async (token) => {
	try {
		// Verifies client token (will throw error if invalid)
		const decoded = await verifyToken(token);
		// Get user from DB (see if user exists)
		const user = await findUser(decoded.id, decoded.role);
		// Return token
		return { auth: authenticate({ id: user.id, role: user.role }), nick: user.nick };
	} catch (error) {
		throw new AppError({
			message: 'Token could not be verified or was not provided',
			type: 'No-Auth',
			status: 401,
		});
	}
};
