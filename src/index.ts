import app from "./app/app";
import knexInstance from "./configs/database";
import config from "./configs/config";

const environment: string = config.NodeEnv;
const port: number = Number(config.Port);
const host: string = config.Host;

knexInstance.raw('SELECT 1 + 1 AS result')
  .then(() => {
    console.log('[server] Database connection successful');
  })
  .catch((error) => {
    console.error('[server] Database connection failed:', error);
    process.exit(1);
  });

console.log(`[server] Server is running on environment: ${environment}`);

app.listen(port, () => {
  console.log(`[server] Server is running on http://${host}:${port}`);
});

export default app;