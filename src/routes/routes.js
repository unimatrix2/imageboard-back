import { Router } from 'express';
import next from '../app';
import tokenRoutes from './token/token.routes';
import userRoutes from './user/user.routes';
import boardRoutes from './board/board.routes';

const router = Router();


router.get('/', (req, res) => {
    next.render(req, res, '/');
});

router.use('/token', tokenRoutes);
router.use('/board', boardRoutes);
router.use('/', userRoutes);
export default router;