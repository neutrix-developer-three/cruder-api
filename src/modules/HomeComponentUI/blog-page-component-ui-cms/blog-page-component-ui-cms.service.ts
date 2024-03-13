import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { BlogPageComponentUiCmsRepository } from './blog-page-component-ui-cms-repository';
import { BlogPageComponentUiCms } from './schema/blog-page-component-ui-cms.schema';
import { UpdateBlogPageComponentUiCmsDto } from './dto/update-blog-page-component-ui-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class BlogPageComponentUiCmsService {
    constructor(
        @InjectModel('blog_page_component_ui_cms')
        private readonly blogPageComponentUiCmsModel: Model<BlogPageComponentUiCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly blogPageComponentUiCmsRepository = new BlogPageComponentUiCmsRepository(
        this.blogPageComponentUiCmsModel
    );

    async updateOrCreateData(
        dto: UpdateBlogPageComponentUiCmsDto
    ): Promise<BlogPageComponentUiCms | Error> {
        const isExists = await this.blogPageComponentUiCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.blogPageComponentUiCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Blog page component ui added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.blogPageComponentUiCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Blog page component ui updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<BlogPageComponentUiCms | Error> {
        const data = await this.blogPageComponentUiCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
