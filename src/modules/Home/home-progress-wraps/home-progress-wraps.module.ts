import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HomeProgressWrapsSchema } from "./schema/home-progress-wraps.schema";
import { HomeProgressWrapsController } from "./home-progress-wraps.controller";
import { HomeProgressWrapsService } from "./home-progress-wraps.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'home_progress_wraps', schema: HomeProgressWrapsSchema }]),
    ],
    controllers: [HomeProgressWrapsController],
    providers: [HomeProgressWrapsService]
})
export class HomeProgressWrapsModule {
}
