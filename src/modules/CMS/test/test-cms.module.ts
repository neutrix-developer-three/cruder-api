
        import { Module } from "@nestjs/common";
        import { JwtModule } from "@nestjs/jwt";
        import { MongooseModule } from "@nestjs/mongoose";
        import JwtConfigService from "src/core/jwt/jwt-config.service";
        import JwtHelper from "src/core/jwt/jwt.helper";
        import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
        import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
        import { UsersSchema } from "../../CRUD/users/schema/users.schema";
        import { TestCMSController } from "./test-cms.controller";
        import { TestCMSService } from "./test-cms.service";
        import { TestCMSSchema } from "./entities/test-cms.entity";
        
        @Module({
            imports: [
                JwtModule.registerAsync({
                    useClass: JwtConfigService
                }),
                MongooseModule.forFeature([
                    { name: 'Users', schema: UsersSchema },
                    { name: 'test_cms', schema: TestCMSSchema },
                ]),
            ],
            controllers: [TestCMSController],
            providers: [TestCMSService, JwtHelper, DoSpacesService, DoSpacesServicerovider]
        })
        export class TestCMSModule {
        }
    