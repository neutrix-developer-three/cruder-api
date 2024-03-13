import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseHomeEchoCmsDto {
    @IsOptional()
    title: string;

    @IsOptional()
    image: string;

    @IsOptional()
    subtitle: string;

    @IsOptional()
    detail: string;

}
