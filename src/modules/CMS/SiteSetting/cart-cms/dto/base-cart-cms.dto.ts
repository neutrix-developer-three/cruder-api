import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseCartCmsDto {
    @IsNotEmpty()
    newUserWelcomeMessage: string;

    @IsOptional()
    regularUserWelcomeMessage: string;

    @IsOptional()
    footerMessage: string;

}
