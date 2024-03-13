import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';
import { MailSenderController } from './mail-sender.controller';

@Module({
    controllers: [MailSenderController],
    providers: [MailSenderService],
    imports: [
    ]
})
export class MailSenderModule { }
