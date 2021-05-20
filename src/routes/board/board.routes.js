import { Router } from 'express';
import { createBoard, getBoard } from '../../services/board.service';
import next from '../../app';
const router = Router();

router.get('/:abbr', async (req, res) => {
    try {
        const board = await getBoard(req.params.abbr);
        next.render(req, res, `/${req.params.abbr}`, { board });
    } catch (error) {
        res.status(500).json(error);
    }
    
    //next.render(req, res, `/${req.params.body}`, { board });
});

export default router;