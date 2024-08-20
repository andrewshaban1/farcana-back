import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import config from './config/default.config';
import { authenticateDB } from './db/init';
import { routes } from './routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [config.frontEndUrl],
  })
);

routes(app);

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});

authenticateDB();
