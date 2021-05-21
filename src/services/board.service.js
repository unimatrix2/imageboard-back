import { create, get } from '../repositories/board.repository';
import { encrypt } from '../utils/passwordManager';
import AppError from '../errors/AppError';

export const createBoard = async (body) => {
	try {
		const board = await create({
			...body,
			secret: await encrypt(body.secret),
		});
		return board;
	} catch (error) {
		throw new AppError(error);
	}
};

export const getBoard = async (abbr) => {
	try {
		const board = await get(abbr);
		return board;
	} catch (error) {
		throw new AppError(error);
	}
};
