import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './route/auth.route.js';
import 'dotenv/config';

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('googleLogin.ejs');
});

app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`User Authentication Server Opened On Port ${port}`);
});

