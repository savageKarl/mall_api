import config from './config/config.default';
import app from './app/index';
const { APP_PORT } = config;

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});
