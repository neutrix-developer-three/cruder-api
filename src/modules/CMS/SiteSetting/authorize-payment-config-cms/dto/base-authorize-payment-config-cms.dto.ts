import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseAuthorizePaymentConfigCmsDto {
    @IsNotEmpty()
    api_login_id: string;

    @IsNotEmpty()
    transaction_key: string;

    @IsNotEmpty()
    account_status: string;
}
