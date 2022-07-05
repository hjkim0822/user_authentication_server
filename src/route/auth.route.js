import express from "express";
import jwt from '../lib/jwt.js'
import redis from '../lib/redis.js';
import userController from "../controller/user.controller.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { platform, idToken } = req.body;
    const {status, message, ...payload} = await userController.verifyIdToken(platform, idToken);
    if (status) {
        const accessToken = jwt.createAccessToken(payload);
        const refreshToken = jwt.createRefreshToken(payload);

        return res.json({message, accessToken, refreshToken});
    } else {
        return res.json(message, payload);
    }
});

router.post('/register', async (req, res) => {
    const userInfo = req.body;
    
    const {updatedAt, createdAt, ...user} = await userController.createUser(userInfo);

    const accessToken = jwt.createAccessToken(user);
    const refreshToken = jwt.createRefreshToken(user);

    console.log(jwt.verifyAccessToken(accessToken));
    res.json({status: 'success', accessToken, refreshToken});
})

router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;

    const {iat, exp, ...decoded} = jwt.verifyRefreshToken(refreshToken);

    if (redis.isBlacklisted(refreshToken)) {
        res.status(401).json({message: "Invalid Refresh Token"});
    }

    const accessesToken = jwt.createAccessToken(decoded);

    res.json({ accessesToken, refreshToken });
});

router.get('/logout', (req, res) => {
    const { refreshToken } = req.body;

    const {iat, exp, ...decoded} = jwt.verifyRefreshToken(refreshToken);
    
    redis.blacklistToken( refreshToken, exp );

    res.json({message: "blacklisted refreshtoken"});
})

export default router;