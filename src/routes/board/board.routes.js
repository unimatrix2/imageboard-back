import { Router } from 'express';
import { getBoard, createBoard, listBoards } from '../../services/board.service';
import { verifyToken } from '../../utils/passwordManager';

const router = Router();

router.get('/:abbr', async (req, res) => {
	try {
		const board = await getBoard(req.params.abbr);
		res.status(200).json(board);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/create', async (req, res) => {
	try {
		const { body } = req;
		const { token } = req.signedCookies;
		const founder = await verifyToken(token);
		const newBoard = await createBoard({ ...body, founder: founder.id, modmins: [founder.id] });
		res.status(200).json(newBoard);
	} catch (error) {
		res.status(error.status).json(error);
	}
});

router.get('/list', async (req, res) => {
	try {
		const boards = await listBoards();
		console.log(boards);
		res.status(200).json(boards);
	} catch (error) {
		res.status(error.status).json(error);
	}
});

export default router;
