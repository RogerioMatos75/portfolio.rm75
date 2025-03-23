import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Experience, Prisma } from '@prisma/client';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Experience[]> {
    return this.prisma.experience.findMany({
      orderBy: { startDate: 'desc' },
    });
  }

  async findCurrent(): Promise<Experience[]> {
    return this.prisma.experience.findMany({
      where: { current: true },
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(id: string): Promise<Experience | null> {
    return this.prisma.experience.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ExperienceCreateInput): Promise<Experience> {
    return this.prisma.experience.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ExperienceUpdateInput): Promise<Experience> {
    return this.prisma.experience.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Experience> {
    return this.prisma.experience.delete({
            where: { id },
        });
    }
}
