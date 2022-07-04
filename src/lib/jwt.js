import jwt from 'jsonwebtoken';
import 'dotenv/config';

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '10m' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '10m' });
}

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
        throw err;
    }
}

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (err) {
        throw err;
    }
}

export default {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
}