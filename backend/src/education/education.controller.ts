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
import { EducationService } from './education.service';
import { Prisma } from '@prisma/client';

@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new education' })
  @ApiBody({ type: Object, description: 'Education data' })
  create(@Body() createEducationDto: Prisma.EducationCreateInput) {
    return this.educationService.create(createEducationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all education' })
  findAll() {
    return this.educationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get education by ID' })
  @ApiParam({ name: 'id', description: 'Education ID' })
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update education by ID' })
  @ApiParam({ name: 'id', description: 'Education ID' })
  @ApiBody({ type: Object, description: 'Updated education data' })
  update(
    @Param('id') id: string,
    @Body() updateEducationDto: Prisma.EducationUpdateInput,
  ) {
    return this.educationService.update(id, updateEducationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete education by ID' })
  @ApiParam({ name: 'id', description: 'Education ID' })
  remove(@Param('id') id: string) {
    return this.educationService.remove(id);
  }
}
