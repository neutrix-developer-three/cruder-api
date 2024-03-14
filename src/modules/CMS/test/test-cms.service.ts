
        import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
        import { InjectModel } from "@nestjs/mongoose";
        import { Model } from "mongoose";
        import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
        import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
        import { Constants } from "src/utils/constants";
        import { ResponseUtils } from "src/utils/response.utils";
        import { TestCMSRepository } from "./test-cms.repository";
        import { UpdateTestCMSDto } from './dto/update-test-cms.dto';
        import { TestCMS } from "./schema/test-cms.schema";
        
        @Injectable()
        export class TestCMSService {
            constructor(
                private readonly doSpaceService: DoSpacesService,
                @InjectModel('test_cms')
                private readonly testCMSModel: Model<TestCMS>
            ) { }
        
            private readonly testCMSRepository =
                new TestCMSRepository(this.testCMSModel);
        
            async updateOrCreateData(
                dto: UpdateTestCMSDto,
                files: {
                    image?: UploadedMulterFileI
                }
            ): Promise<TestCMS | Error> {
                if (files && files.image) {
                    const image: any = await this.doSpaceService.uploadFile(files.image[0], "TestCMS/");
                    dto.image = image;
                }
                const isExists = await this.testCMSRepository.findOneByFilterQuery({ isDeleted: false });
                if (!isExists) {
                    const data = await this.testCMSRepository.createEntity(dto);
                    if (!data) {
                        throw new BadRequestException("Failed to create data!");
                    }
                    return ResponseUtils.successResponseHandler(201, "Data created successfully!", "data", data);
                } else {
                    const id = isExists?._id.toString();
                    const data = await this.testCMSRepository.updateEntity(id, dto);
                    if (!data) {
                        throw new BadRequestException("Failed to update data!");
                    }
                    return ResponseUtils.successResponseHandler(200, "Data updated successfully!", "data", data);
                }
            }
        
            async findAll(): Promise<TestCMS[] | Error> {
                const data = await this.testCMSRepository.findAll();
                if (!data) {
                    throw new HttpException(
                        Constants.NOT_FOUND,
                        HttpStatus.NOT_FOUND
                    );
                }
                return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
            }
        }
    