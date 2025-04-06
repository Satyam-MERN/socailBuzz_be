const databaseConfig = {
  host: process.env.DB_HOST,
  url: process.env.DB_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export default databaseConfig;
