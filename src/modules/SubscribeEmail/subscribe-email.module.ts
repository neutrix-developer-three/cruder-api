import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SubscribeEmailSchema } from "./schema/subscribe-email.schema";
import { SubscribeEmailController } from "./subscribe-email.controller";
import { SubscribeEmailService } from "./subscribe-email.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'subscribe_email', schema: SubscribeEmailSchema }]),
    ],
    controllers: [SubscribeEmailController],
    providers: [SubscribeEmailService]
})
export class SubscribeEmailModule {
}
