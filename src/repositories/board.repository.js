import Board from '../models/Board.model';
import AppError from '../errors/AppError';

export const create = async (body) => {
	try {
		const newBoard = new Board(body);
		await newBoard.save();
		return newBoard;
	} catch (error) {
		throw new AppError({
			message: Object.keys(error.keyValue) || 'Could not create board',
			type: 'Board-Create',
			status: Object.keys(error.keyValue).length > 0 ? 400 : 500,
		});
	}
};

export const get = async (abbr) => {
	try {
		const board = await Board.findOne({ abbr }, ['abbr', 'title', 'description', 'rules'])
			.populate('founder', { nick: 1, _id: 0 })
			.populate('modmins', { nick: 1, _id: 0 });
		console.log(board);
		return;
	} catch (error) {
		throw new AppError({
			message: 'Board does not exist',
			type: 'Board-Get',
			status: 400,
		});
	}
};
