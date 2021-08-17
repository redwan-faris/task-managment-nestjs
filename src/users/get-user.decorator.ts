import { createParamDecorator } from "@nestjs/common";
import User from "../users/entities/user.entity";


export const GetUser = createParamDecorator((data, req) => {
    return req.args[0].user;``
}); 