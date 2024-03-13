import { PartialType } from "@nestjs/mapped-types";
import { CreateHomeIntroDto } from "./create-home-intro.dto";

export class UpdateHomeIntroDto extends PartialType(CreateHomeIntroDto) { }