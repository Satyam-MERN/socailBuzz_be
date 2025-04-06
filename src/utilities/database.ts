import mongoose from "mongoose";
import logger from "./winstonLogger";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds
const dbConnection = async (url: string) => {
  let retries = 0;
  const connectWithRetry = async (url: string) => {
    try {
      const connection = await mongoose.connect(url);
      logger.info(`MongoDB connected to ${connection.connection.host}`);
    } catch (error: any) {
      retries++;
      if (retries > MAX_RETRIES) {
        logger.error(
          `Failed to connect to MongoDB after ${MAX_RETRIES} attempts`
        );
        process.exit(1); 
      }
      logger.error(
        ` Attempt Number:${retries} MongoDB connection error: ${error.message}. Retrying in ${
          RETRY_DELAY / 1000
        } seconds...`
      );
      setTimeout(() => connectWithRetry(url), RETRY_DELAY);
    }
  };
  connectWithRetry(url);
};

export default dbConnection;
