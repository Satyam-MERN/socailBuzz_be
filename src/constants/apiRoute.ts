import { get } from "http";

const apiVersionRoute = (version: string = "v1") => {
  return { baseURL: `/api/${version}` };
};
const apiRoute = {
  user: {
    path: "/users",
    routes: {
      createUser: "/create",
      getAllUsers: "/all",
      getUser: "/:id",
      updateUser: "/update/:id",
      deleteUser: "/delete/:id",
    },
  },
};
export { apiRoute, apiVersionRoute };
