import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import JwtHelper from "../jwt/jwt.helper";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/modules/CRUD/users/schema/users.schema";
import { UsersRepository } from "src/modules/CRUD/users/users.repository";


@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(
        private readonly jwtHelper: JwtHelper,
        @InjectModel('Users') private readonly usersModel: Model<Users>,
    ) { }

    private readonly usersRepository = new UsersRepository(this.usersModel);

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const handler = context.getHandler();
        req.handler = handler;
        return await this.validateRequest(req);
    }

    async validateRequest(req: any): Promise<boolean> {
        try {
            const bearerToken = req.headers.authorization;
            const bearer = 'Bearer ';
            if (!bearerToken || !bearerToken.startsWith(bearer)) {
                return false;
            }
            const token = bearerToken.replace(bearer, '');
            const jwtPayload = this.jwtHelper.verifyToken(token);
            const data = await this.usersRepository.findOneEntity(
                jwtPayload.userId
            );

            if (!data || data instanceof Error || (data.userType !== 'admin')) {
                return false;
            }

            req.user = data;

            return true;
        } catch (e) {
            return false;
        }
    }

}