import app from "./configs/app";
import knexInstance from "./configs/database";
import config from "./configs/config";

const port: number = Number(config.PORT);
const host: string = config.HOST;

knexInstance.raw('SELECT 1 + 1 AS result')
  .then(() => {
    console.log('[server] Database connection successful');
  })
  .catch((error) => {
    console.error('[server] Database connection failed:', error);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`[server] Server is running on http://${host}:${port}`);
});

export default app;