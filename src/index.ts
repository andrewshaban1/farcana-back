import app from './app';
import config from './config/default.config';
import { authenticateDB } from './db/init';

app.listen(config.port, () => {
  console.log(
    `Server is running at http://${config.backEndHost}:${config.port}`
  );
});

authenticateDB();
