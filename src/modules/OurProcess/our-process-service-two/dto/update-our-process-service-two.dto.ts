import { PartialType } from "@nestjs/mapped-types";
import { CreateOurProcessServiceTwoDto } from "./create-our-process-service-two.dto";

export class UpdateOurProcessServiceTwoDto extends PartialType(CreateOurProcessServiceTwoDto) { }