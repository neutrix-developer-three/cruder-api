import { PartialType } from "@nestjs/mapped-types";
import { CreateHomeGalleryDto } from "./create-home-gallery.dto";

export class UpdateHomeGalleryDto extends PartialType(CreateHomeGalleryDto) { }