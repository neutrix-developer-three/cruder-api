
        import { IsNotEmpty, IsOptional } from "class-validator";

        export class BaseTestCMSDto {
            @IsOptional() name?: string;
@IsOptional() phone?: string;
        }
    