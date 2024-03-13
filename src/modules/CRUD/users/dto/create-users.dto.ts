import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "src/modules/rbac/schema/role.schema";
import { UserEnumType, UserStatusEnumType } from "src/utils/enum.utils";

export class CreateUsersDto {

    @IsOptional()
    fullName: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    city: string;

    @IsOptional()
    post_code: string;

    @IsOptional()
    country: string;

    @IsOptional()
    image: string;

    @IsOptional()
    @IsEnum(UserEnumType)
    userType: UserEnumType;

    @IsOptional()
    role_id: string;

    @IsEmpty()
    role: Role;

    @IsOptional()
    @IsEnum(UserStatusEnumType)
    status: UserStatusEnumType;
}
