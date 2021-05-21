import { create, get } from '../repositories/board.repository';
import AppError from '../errors/AppError';

export const createBoard = async (body) => {
	try {
		const board = await create(body);
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
