import { IsOptional } from "class-validator";

export class CreateLogActivityDto {
    @IsOptional()
    subject: string;

    @IsOptional()
    url: string;

    @IsOptional()
    method: string;

    @IsOptional()
    ip: string;

    @IsOptional()
    agent: string;

    @IsOptional()
    user_id: string;

    @IsOptional()
    user_name: string;

}