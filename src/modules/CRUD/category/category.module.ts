import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./schema/category.schema";
import JwtConfigService from "src/core/jwt/jwt-config.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersSchema } from "../users/schema/users.schema";
import JwtHelper from "src/core/jwt/jwt.helper";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";

@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
        MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema },
        { name: 'Category', schema: CategorySchema }]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService, JwtHelper, DoSpacesService ,DoSpacesServicerovider]
})
export class CategoryModule {
}
