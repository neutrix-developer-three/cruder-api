import { PartialType } from "@nestjs/mapped-types";
import { CreateWhyChooseUsFeaturesDto } from "./create-why-choose-us-features.dto";

export class UpdateWhyChooseUsFeaturesDto extends PartialType(CreateWhyChooseUsFeaturesDto) { }