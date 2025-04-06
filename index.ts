import { useContainer } from "routing-controllers";
import Container from "typedi";
import bootsTrapApplication from "./src/app";
import cluster from "cluster";
import logger from "./src/utilities/winstonLogger";
import { config } from "dotenv";
import dbConnection from "./src/utilities/database";
import os from "os";
if (cluster.isPrimary) {
  const numberOfCores = os.cpus().length;
  config();
  logger.info(`Master ${process.pid} is running`);
  for (let i = 0; i < Math.floor(numberOfCores / 2); i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    logger.warn(`Worker ${process.pid} died`);
    cluster.fork();
  });
  dbConnection(process.env.DB_URL as string);
  const app = bootsTrapApplication();
  useContainer(Container);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Server is running on port ${port} process id ${process.pid}`);
  });
} else {
}
