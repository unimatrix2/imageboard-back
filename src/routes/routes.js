import { Router } from 'express';
import tokenRoutes from './token/token.routes';
import boardRoutes from './board/board.routes';

const router = Router();

router.use('/token', tokenRoutes);
router.use('/board', boardRoutes);
export default router;
