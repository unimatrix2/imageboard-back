import express from 'express';
import createNextApp from 'next';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Config DOTENV
dotenv.config();

// Imports
import mongoConnection from './configs/db.config';
import routes from './routes/routes';
import AppError from './errors/AppError';

// Next Setup
const next = createNextApp({ dev: process.env.NODE_ENV !== 'production', dir: __dirname + '/app' });
export const getRequestHandler = next.getRequestHandler();

next.prepare()
    .then(() => {
        // App Setup
        // App Instance
        const app = express();

        // Middlewares Setup
        app.use(helmet({ contentSecurityPolicy: false }))
        app.use(morgan('tiny'))
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors({ origin: process.env.FRONT_END_URL }));
        app.use(mongoSanitize());
        app.use(cookieParser(process.env.COOKIE_SECRET));

        // Routes Setup
        // Testing routes only
        app.use('/', routes)
        app.get('*', getRequestHandler);
        // Error Handling Setup

        // DB Connection
        mongoConnection(process.env.MONGODB_LOCAL_URL);

        // Server Start
        app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

export default next;