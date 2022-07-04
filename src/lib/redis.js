import { createClient } from 'redis';

let redisClient;
(async () => {
    redisClient = createClient();

    redisClient.on("error", (error) => {
        console.log(error);
    });
    redisClient.on("connect", () => {
        console.log("Redis connected!");
    });

    await redisClient.connect();
})();

const blacklistToken = async (token, exp) => {
    tokenKey = `bl_${token}`;
    await redisClient.set(tokenKey, token);
    redisClient.expireAt(tokenKey, exp);

    return;
}

const isBlacklisted = async (token) => {
    const blacklisted = await redisClient.get(`bl_${token}`);
    if (blacklisted) {
        return true;
    }
    return false;
}

export default {
    blacklistToken,
    isBlacklisted,
}