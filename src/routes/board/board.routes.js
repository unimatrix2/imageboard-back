import { Router } from 'express';
import { getBoard } from '../../services/board.service';

const router = Router();

router.get('/:abbr', async (req, res) => {
	try {
		const board = await getBoard(req.params.abbr);
		res.status(200).json(board);
	} catch (error) {
		res.status(500).json(error);
	}
});

export default router;
