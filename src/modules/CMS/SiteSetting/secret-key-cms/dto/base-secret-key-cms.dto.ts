import { IsNotEmpty } from "class-validator";

export class BaseSecretKeyCmsDto {
    @IsNotEmpty()
    secretKey: string;
}
