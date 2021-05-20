import { Router } from 'express';
import next from '../../app';
import AppError from '../../errors/AppError';

const router = Router();

router.get('/register', (req, res) => {
    next.render(req, res, '/register');
})

export default router;