import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Constants } from '../../utils/constants';
import { ResetPasswordMailDto } from './dto/create-reset-password-mail.dto';
import { CreateOrderMailSenderDto } from './dto/create-order-mail-sender.dto';

@Injectable()
export class MailSenderService {
    constructor(
        private readonly mailerService: MailerService,
    ) {
    }

    async sendOrderMail(dto: CreateOrderMailSenderDto) {
        const { to, from, subject, orderId } = dto;

        const result = await this.mailerService
            .sendMail({
                to: to,
                bcc: ['neutrixtester@gmail.com'],
                from: from,
                subject: subject,
                template: './templates/user_order_email',
                context: {
                    orderId: orderId
                }
            })
            .catch((err) => {
                throw new BadRequestException(
                    'Mail send fail',
                  );
                // throw new HttpException(
                //     Constants.GENERIC_ERROR,
                //     HttpStatus.INTERNAL_SERVER_ERROR
                // );
            });
        return {
            message: 'Mail sent to: ' + to
        };
    }

    async sendPasswordResetRequestMail(dto: ResetPasswordMailDto) {
        const { to, from, subject, username, token, email, companyEmail, companyAddress } = dto;

        const result = await this.mailerService
            .sendMail({
                to: to,
                bcc: ['neutrixtester@gmail.com'],
                from: from,
                subject: subject,
                template: './templates/dynamic_customer_forgot_password_email',
                context: {
                    username: username,
                    token: token,
                    passwordResetURL: process.env.PASSWORD_RESET_PAGE,
                    privacyPolicyPage: process.env.PRIVACY_POLICY_PAGE,
                    termsOfUsePage: process.env.TERMS_OF_USE_PAGE,
                    companyEmail: companyEmail,
                    companyAddress: companyAddress,
                }
            })
            .catch((err) => {
                throw new HttpException(
                    Constants.GENERIC_ERROR,
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            });
        return {
            message: 'Mail sent to: ' + to
        };
    }

}
