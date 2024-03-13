import { PartialType } from "@nestjs/mapped-types";
import { CreateOurProcessServiceOneDto } from "./create-our-process-service-one.dto";

export class UpdateOurProcessServiceOneDto extends PartialType(CreateOurProcessServiceOneDto) { }