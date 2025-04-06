import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { errorHandler } from "./middlewares/errorHandler";
const bootsTrapApplication = () => {
  const app = createExpressServer({
    controllers: [__dirname + "/controllers/*.ts"],
    middlewares: [__dirname + "/middlewares/*.ts"],
    defaultErrorHandler: false,
    classTransformer: true,
    validation: true,
  });
  app.use(errorHandler);
  return app;
};

export default bootsTrapApplication;

