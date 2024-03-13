import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { FilterDto } from 'src/core/filter.dto';
import { HomeInstagramService } from './home-instagram.service';
import { CreateHomeInstagramDto } from './dto/create-home-instagram.dto';
import { UpdateHomeInstagramDto } from './dto/update-home-instagram.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';

@Controller({ path: 'home-instagram', version: Constants.API_VERSION_1 })
export class HomeInstagramController {
  constructor(private readonly service: HomeInstagramService) {}

  @Post()
  @StaticRoutesProps({ routeName: 'home-instagram' })
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'media_url', maxCount: 1 }]))
  create(
    @Body() dto: CreateHomeInstagramDto,
    @UploadedFiles()
    files: {
      media_url?: UploadedMulterFileI;
    },
  ) {
    console.log('dto ', dto);
    return this.service.create(dto, files);
  }
  @Get()
  @StaticRoutesProps({ routeName: 'home-instagram' })
  @UseGuards(AdminAuthGuard)
  findAll(@Query() filterDto: FilterDto) {
    return this.service.findAll(filterDto);
  }

  @Get(':id')
  @StaticRoutesProps({ routeName: 'home-instagram' })
  @UseGuards(AdminAuthGuard)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch('/:id')
  @StaticRoutesProps({ routeName: 'home-instagram' })
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'media_url', maxCount: 1 }]))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateHomeInstagramDto,
    @UploadedFiles()
    files: {
      media_url?: UploadedMulterFileI;
    },
  ) {
    return this.service.update(id, dto, files);
  }

  @Delete(':id')
  @StaticRoutesProps({ routeName: 'home-instagram' })
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
