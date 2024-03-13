import { PartialType } from "@nestjs/mapped-types";
import { CreateHomeTestimonialsDto } from "./create-home-testimonials.dto";

export class UpdateHomeTestimonialsDto extends PartialType(CreateHomeTestimonialsDto) { }