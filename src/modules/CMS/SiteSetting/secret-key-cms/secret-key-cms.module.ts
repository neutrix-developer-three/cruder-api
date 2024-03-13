import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecretKeyCmsController } from './secret-key-cms.controller';
import { SecretKeyCmsService } from './secret-key-cms.service';
import { SecretKeyCmsSchema } from './schema/secret-key-cms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'secret_keys', schema: SecretKeyCmsSchema }
        ])
    ],
    controllers: [SecretKeyCmsController],
    providers: [SecretKeyCmsService]
})
export class SecretKeyCmsModule {}
