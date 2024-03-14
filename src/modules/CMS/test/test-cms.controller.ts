
        import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
        import { FileFieldsInterceptor } from "@nestjs/platform-express";
        import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
        import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
        import { Constants } from "src/utils/constants";
        import { TestCMSService } from "./test-cms.service";
        import { UpdateTestCMSDto } from "./dto/update-test-cms.dto";

        @Controller({ path: "test-cms", version: Constants.API_VERSION_1 })

        export class TestCMSController {
            constructor(private readonly service: TestCMSService) {
            }

            @Post()
            @HttpCode(HttpStatus.OK)
            @UseGuards(AdminAuthGuard)
            @UseInterceptors(FileFieldsInterceptor(
                [
                    { name: "image", maxCount: 1 }
                ]
            ))
            updateOrCreateData(
                @Body() dto: UpdateTestCMSDto,
                @UploadedFiles() files: {
                    image?: UploadedMulterFileI
                }
            ) {
                return this.service.updateOrCreateData(dto, files);
            }

            @Get()
            // @UseGuards(AdminAuthGuard)
            findAll() {
                return this.service.findAll();
            }
        }
    