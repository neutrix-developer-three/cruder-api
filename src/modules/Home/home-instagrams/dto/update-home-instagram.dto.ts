import { PartialType } from "@nestjs/mapped-types";
import { CreateHomeInstagramDto } from "./create-home-instagram.dto";

export class UpdateHomeInstagramDto extends PartialType(CreateHomeInstagramDto) { }