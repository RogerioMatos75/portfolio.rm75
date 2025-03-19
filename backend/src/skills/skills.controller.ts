import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Prisma } from '@prisma/client';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  create(@Body() createSkillDto: Prisma.SkillCreateInput) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  findAll(@Query('category') category?: string) {
    if (category) {
      return this.skillsService.findByCategory(category);
    }
    return this.skillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSkillDto: Prisma.SkillUpdateInput,
  ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}
