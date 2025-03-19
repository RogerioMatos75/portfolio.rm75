import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.experience.findMany({
      orderBy: { startDate: 'desc' },
    });
  }

  async findCurrent() {
    return await this.prisma.experience.findMany({
      where: { current: true },
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return await this.prisma.experience.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ExperienceCreateInput) {
    return await this.prisma.experience.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ExperienceUpdateInput) {
    return await this.prisma.experience.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.experience.delete({
      where: { id },
    });
  }
}
