import { Router } from 'express';
import { getBoard, createBoard } from '../../services/board.service';
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
		res.status(500).json(error);
	}
});

export default router;
