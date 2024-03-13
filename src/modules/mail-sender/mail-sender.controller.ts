import { Body, Controller, Post } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';
import { Constants } from '../../utils/constants';

@Controller({
    path: 'mail-sender',
    version: Constants.API_VERSION_1
})
export class MailSenderController {
    constructor(private readonly mailSenderService: MailSenderService) { }
}
