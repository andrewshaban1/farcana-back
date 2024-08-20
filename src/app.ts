import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import config from './config/default.config';
import router from './routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [config.frontEndUrl],
  })
);

app.use(router);

export default app;
