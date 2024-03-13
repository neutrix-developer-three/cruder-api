import {Test, TestingModule} from '@nestjs/testing';
import {MailSenderController} from './mail-sender.controller';
import {MailSenderService} from './mail-sender.service';

describe('MailSenderController', () => {
    let controller: MailSenderController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MailSenderController],
            providers: [MailSenderService],
        }).compile();

        controller = module.get<MailSenderController>(MailSenderController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
