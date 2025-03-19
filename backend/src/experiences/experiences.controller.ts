import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { ExperiencesService } from './experiences.service';
import { Prisma } from '@prisma/client';

@ApiTags('experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new experience' })
  @ApiBody({ type: Object, description: 'Experience data' })
  create(@Body() createExperienceDto: Prisma.ExperienceCreateInput) {
    return this.experiencesService.create(createExperienceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experiences' })
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current experiences' })
  findCurrent() {
    return this.experiencesService.findCurrent();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get experience by ID' })
  @ApiParam({ name: 'id', description: 'Experience ID' })
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update experience by ID' })
  @ApiParam({ name: 'id', description: 'Experience ID' })
  @ApiBody({ type: Object, description: 'Updated experience data' })
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: Prisma.ExperienceUpdateInput,
  ) {
    return this.experiencesService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete experience by ID' })
  @ApiParam({ name: 'id', description: 'Experience ID' })
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id);
  }
}
