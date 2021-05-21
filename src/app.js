import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoConnection from './configs/db.config';
import routes from './routes/routes';

// Config DOTENV
dotenv.config();

const app = express();

// Middlewares Setup
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.FRONT_END_URL }));
app.use(mongoSanitize());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes Setup
// Testing routes only
app.use('/api', routes);

// Error Handling Setup

// DB Connection
mongoConnection(process.env.MONGODB_LOCAL_URL);

// Server Start
app.listen(process.env.PORT, () => process.stdout.write(`App running on PORT ${process.env.PORT}\n`));
