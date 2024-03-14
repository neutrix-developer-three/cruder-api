
        import { PartialType } from "@nestjs/mapped-types";
        import { BaseTestCMSDto } from "./base-test-cms.dto";
        
        export class UpdateTestCMSDto extends PartialType(BaseTestCMSDto) {
        }
    