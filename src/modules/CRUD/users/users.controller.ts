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
// import {AdminAuthGuard} from "src/core/guards/admin-auth.guard";
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { FilterDto } from 'src/core/filter.dto';

@Controller({ path: 'users', version: Constants.API_VERSION_1 })
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  // @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  create(
    @Body() dto: CreateUsersDto,
    @UploadedFiles()
    files: {
      image?: UploadedMulterFileI;
    },
  ) {
    return this.service.create(dto, files);
  }

  @Get('form-data')
  @StaticRoutesProps({ routeName: 'user-add' })
  @UseGuards(AdminAuthGuard)
  formData() {
    return this.service.formData();
  }

  @Get('/customer')
  findAllCustomer(@Query() filterDto:FilterDto) {
    return this.service.findAllCustomer(filterDto);
  }
  @Get('/all-admin-user')
  findAllAdminUser() {
    return this.service.findAllAdminUser();
  }
  @Get()
  //@UseGuards(AdminAuthGuard)
  findAll(@Query() filterDto:FilterDto) {
    return this.service.findAll(filterDto);
  }

  @Get(':id')
  // @UseGuards(AdminAuthGuard)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch('/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUsersDto,
    @UploadedFiles()
    files: {
      image?: UploadedMulterFileI;
    },
  ) {
    return this.service.update(id, dto, files);
  }

  @Delete(':id')
  //@UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
