import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Education, Prisma } from '@prisma/client';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Education[]> {
    return this.prisma.education.findMany({
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(id: string): Promise<Education | null> {
    return this.prisma.education.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.EducationCreateInput): Promise<Education> {
    return this.prisma.education.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.EducationUpdateInput,
  ): Promise<Education> {
    return this.prisma.education.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Education> {
    return this.prisma.education.delete({
      where: { id },
    });
  }
}
