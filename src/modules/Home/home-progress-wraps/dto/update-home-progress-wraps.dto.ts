import { PartialType } from "@nestjs/mapped-types";
import { CreateHomeProgressWrapsDto } from "./create-home-progress-wraps.dto";

export class UpdateHomeProgressWrapsDto extends PartialType(CreateHomeProgressWrapsDto) { }