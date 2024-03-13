import {IsNotEmpty} from "class-validator";

export class GoogleLoginDto {
    @IsNotEmpty()
    readonly token: string;
}
