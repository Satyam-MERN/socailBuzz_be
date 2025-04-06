import { Service } from "typedi";
import {
  Get,
  Post,
  JsonController,
  Put,
  Delete,
  Req,
  Param,
  Res,
  Body,
} from "routing-controllers";
import { apiRoute, apiVersionRoute } from "../constants/apiRoute";
import { Request } from "express";
import { UserService } from "../services/userService";
import { CreateUserDTO } from "../dtos/createUserDTO";
@Service()
@JsonController(`${apiVersionRoute().baseURL}${apiRoute.user.path}`)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(`${apiRoute.user.routes.getAllUsers}`)
  getUsers() {
    return { message: "User list" };
  }
  @Post(`${apiRoute.user.routes.createUser}`)
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateUserDTO
  ) {
    return await this.userService.createUser(body);
  }
  @Get(`${apiRoute.user.routes.getUser}`)
  getUser() {
    return { message: "User details" };
  }
  @Put(`${apiRoute.user.routes.updateUser}`)
  updateUser(@Req() req: Request, @Param("id") id: number) {
    return { message: "User updated", userId: req.params.id, id };
  }
  @Delete(`${apiRoute.user.routes.deleteUser}`)
  deleteUser(@Req() req: Request) {
    return { message: "User deleted", userId: req.params.id };
  }
}
