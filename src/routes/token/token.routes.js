import { Router } from 'express';
import AppError from '../../errors/AppError';
import { createAnon, verifyUserToken } from '../../services/user.service';

const router = Router();

router.get('/verify', async (req, res) => {
    try {
        // Get token from headers
        const token = req.signedCookies.token;
        // validate token
        const newToken = await verifyUserToken(token);
        // Send token
        res.cookie('token', newToken.auth, { maxAge: process.env.COOKIE_EXPIRY, httpOnly: true, signed: true, sameSite: 'strict', secure: true })
        res.json({ nick: newToken.nick, message: 'Validated', type: 'Success', status: 200 }).status(200);

    } catch (error) {
        // Create new anon & send (user will need sensitive info at the start)
        try {
            const newAnon = await createAnon();
            res.cookie('token', newAnon.token, { maxAge: process.env.COOKIE_EXPIRY, httpOnly: true, signed: true, sameSite: 'strict', secure: true })
            res.json(newAnon.anon).status(200);
        } catch (error) { throw new AppError(error) };
        
    };
});

export default router;