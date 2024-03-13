import { Pages } from "aws-sdk/clients/securityhub";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    roleName: string;

    @IsNotEmpty()
    pageAccess: Pages[];
}
