import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { BlogPageCmsRepository } from './blog-page-cms-repository';
import { BlogPageCms } from './schema/blog-page-cms.schema';
import { UpdateBlogPageCmsDto } from './dto/update-blog-page-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class BlogPageCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        private readonly logService: LogActivityService,
        @InjectModel('blog_page_cms')
        private readonly blogPageCmsModel: Model<BlogPageCms>
    ) { }

    private readonly blogPageCmsRepository = new BlogPageCmsRepository(
        this.blogPageCmsModel
    );

    async updateOrCreateData(
        dto: UpdateBlogPageCmsDto,
        files: {
            banner_image?: UploadedMulterFileI,
        }
    ): Promise<BlogPageCms | Error> {
        if (files && files.banner_image) {    
            const banner_image: any = await this.doSpaceService.uploadFile(files.banner_image[0], "BlogPageCMS/");
            dto.banner_image = banner_image;           
        }
        const isExists = await this.blogPageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.blogPageCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Blg page cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.blogPageCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Blg page cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<BlogPageCms | Error> {
        const data = await this.blogPageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
