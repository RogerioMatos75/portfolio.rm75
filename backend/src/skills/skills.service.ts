import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Skill, Prisma } from '@prisma/client';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }

  async findByCategory(category: string): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: { category },
    });
  }

  async findOne(id: string): Promise<Skill | null> {
    return this.prisma.skill.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.SkillCreateInput): Promise<Skill> {
    return this.prisma.skill.create({
      data,
    });
  }

  async update(id: string, data: Prisma.SkillUpdateInput): Promise<Skill> {
    return this.prisma.skill.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Skill> {
    return this.prisma.skill.delete({
      where: { id },
    });
  }
}
