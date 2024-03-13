import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { Constants } from 'src/utils/constants';
import { CreatePagesDto } from './dto/create-pages.dto';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { UpdatePagesDto } from './dto/update-pages.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller({ path: 'rbac', version: Constants.API_VERSION_1 })
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}


  @Post('pages')
  @StaticRoutesProps({ routeName: 'pages-add' })
  @UseGuards(AdminAuthGuard)
  async createPage(
    @Body() dto: CreatePagesDto
  ) {
    return await this.rbacService.createPage(dto);
  }

  @Get('pages')
  @StaticRoutesProps({ routeName: 'pages' })
  @UseGuards(AdminAuthGuard)
  async findAllPage(
    @Query('page') pageParam?: string,
    @Query('limit') limitParam?: string,
  ) {
    return await this.rbacService.findAllPage(pageParam, limitParam);
  }

  @Get('pages/:id')
  @StaticRoutesProps({ routeName: 'pages-edit' })
  @UseGuards(AdminAuthGuard)
  async findOnePage(@Param('id') id: string) {
    return await this.rbacService.findOnePage(id);
  }

  @Patch('pages/:id')
  @StaticRoutesProps({ routeName: 'pages-edit' })
  @UseGuards(AdminAuthGuard)
  async updatePage(
    @Param('id') id: string,
    @Body() dto: UpdatePagesDto
  ) {
    return await this.rbacService.updatePage(id, dto);
  }

  @Delete('pages/:id')
  @StaticRoutesProps({ routeName: 'pages-delete' })
  @UseGuards(AdminAuthGuard)
  async removePage(@Param('id') id: string) {
    return await this.rbacService.removePage(id);
  }

  @Post('role')
  @StaticRoutesProps({ routeName: 'role-add' })
  @UseGuards(AdminAuthGuard)
  async createRole(
    @Body() dto: CreateRoleDto
  ) {
    return await this.rbacService.createRole(dto);
  }

  @Get('role/form-data')
  @StaticRoutesProps({ routeName: 'role-add' })
  @UseGuards(AdminAuthGuard)
  formData() {
    return this.rbacService.roleFormData();
  }

  @Get('role')
  @StaticRoutesProps({ routeName: 'role' })
  @UseGuards(AdminAuthGuard)
  async findAllRole(
    @Query('page') pageParam?: string,
    @Query('limit') limitParam?: string,
  ) {
    return await this.rbacService.findAllRole(pageParam, limitParam);
  }

  @Get('role/:id')
  @StaticRoutesProps({ routeName: 'role-edit' })
  @UseGuards(AdminAuthGuard)
  async findOneRole(@Param('id') id: string) {
    return await this.rbacService.findOneRole(id);
  }

  @Patch('role/:id')
  @StaticRoutesProps({ routeName: 'role-edit' })
  @UseGuards(AdminAuthGuard)
  async updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto
  ) {
    return await this.rbacService.updateRole(id, dto);
  }

  @Delete('role/:id')
  @StaticRoutesProps({ routeName: 'role-delete' })
  @UseGuards(AdminAuthGuard)
  async removeRole(@Param('id') id: string) {
    return await this.rbacService.removeRole(id);
  }






  
}
