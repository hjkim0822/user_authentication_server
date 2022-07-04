import models from '../../db/models/index.js';
import { OAuth2Client } from 'google-auth-library';
import 'dotenv/config';

const verifyIdToken = async (platform, idToken) => {
    // TODO: verify idToken with googleOAuth
    if (platform == 'google') {
        try {
            const email = verifyGoogle(idToken);

            const user = await models.User.findOne({
                where: {
                    email
                }
            })
    
            if (user) return {status: true, message: 'login success!', user};
            else return {status: false, message: 'register first', email};
        } catch (err) {
            //! google auth error
            throw err;
        }
    }
}

const createUser = async (userInfo) => {
    try {
        const user = await models.User.findOrCreate({
            where: {
                email: userInfo.email,
            },
            defaults: userInfo
        });

        return user;
    } catch (err) {
        console.log(err);
    }
}

export default {
    verifyIdToken,
    createUser,
}

const verifyGoogle = async (idToken) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const { email } = ticket.getPayload();
        
        return email;
    } catch (err) {
        throw new Error("Google OAuth Error");
    }
}