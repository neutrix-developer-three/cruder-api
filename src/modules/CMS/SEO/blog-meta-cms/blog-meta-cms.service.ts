import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { FilterDto } from 'src/core/filter.dto';
import { BlogMetaCmsRepository } from './blog-meta-cms-repository';
import { BlogMetaCms } from './schema/blog-meta-cms.schema';
import { Blog } from 'src/modules/Blog/blog/schema/blog.schema';
import { BlogRepository } from 'src/modules/Blog/blog/blog.repository';
import { UpdateBlogMetaCmsDto } from './dto/update-blog-meta-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class BlogMetaCmsService {
    constructor(
        @InjectModel('blog_meta_cms')
        private readonly blogMetaCmsModel: Model<BlogMetaCms>,
        @InjectModel('blogs') private readonly blogModel: Model<Blog>,
        private readonly logService: LogActivityService
    ) { }

    private readonly blogMetaCmsRepository = new BlogMetaCmsRepository(
        this.blogMetaCmsModel
    );
    private readonly blogRepository = new BlogRepository(this.blogModel);

    async updateOrCreateData(
        blogId:string,
        dto: UpdateBlogMetaCmsDto
    ): Promise<BlogMetaCms | Error> {
        const blog = await this.blogRepository.findOneEntity(blogId);
          if (!blog) {
            throw new NotFoundException('Blog Not Found');
          }
        const isExists = await this.blogMetaCmsRepository.findOneByFilterQuery({
            blogId: blogId
        });
        dto.blogId=blogId;
        if (!isExists) {
            const data = await this.blogMetaCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Blog meta added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.blogMetaCmsRepository.updateEntity(id, dto);
            await this.logService.createLog('Blog meta updated.');
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
        
    }

    async findAll(filterDto:FilterDto): Promise<BlogMetaCms | Error> {
        const paginateData = await this.blogRepository.paginate(filterDto);
        for (const blog of paginateData?.data) {
            const BlogMeta = await this.blogMetaCmsRepository.findOneByFilterQuery({blogId:blog._id});
            if(BlogMeta){
                blog['BlogMeta'] = BlogMeta;
            }
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", paginateData);
    }


}
