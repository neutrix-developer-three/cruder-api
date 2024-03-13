import { PartialType } from "@nestjs/mapped-types";
import { CreateSubscribeEmailDto } from "./create-subscribe-email";

export class UpdateSubscribeEmailDto extends PartialType(CreateSubscribeEmailDto) { }