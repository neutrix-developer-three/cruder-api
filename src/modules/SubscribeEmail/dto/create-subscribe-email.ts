import { IsNotEmpty } from "class-validator";

export class CreateSubscribeEmailDto {
    @IsNotEmpty()
    email: string;

}
