import { PartialType } from "@nestjs/mapped-types";
import { CreateHomeVideoDto } from "./create-home-video.dto";

export class UpdateHomeVideoDto extends PartialType(CreateHomeVideoDto) { }