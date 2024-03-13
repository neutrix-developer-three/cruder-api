import {IsNotEmpty} from "class-validator";

export class FacebookLoginDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly email: string;
}
