
        import { IsNotEmpty, IsOptional } from "class-validator";

        export class BaseTestCMSDto {
            @IsNotEmpty() Phone: string;
@IsNotEmpty() Name: string;
        }
    