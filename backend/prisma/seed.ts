import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

interface TechnologyData {
  id: string;
  nome: string;
  destaque: boolean;
  descricao: string;
  imagem: string;
}

interface ProjectData {
  id: string;
  nome: string;
  descricao: string;
  tipo: string;
  imagens: string;
  nivel: number;
  repositorio: string;
  destaque: boolean;
}

function loadTechnologiesCSV(filePath: string): TechnologyData[] {
  try {
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    console.error(`Error loading CSV file ${filePath}:`, error);
    return [];
  }
}

function loadProjectsCSV(filePath: string): ProjectData[] {
  try {
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    console.error(`Error loading CSV file ${filePath}:`, error);
    return [];
  }
}

async function seedTechnologies() {
  try {
    const technologiesData: TechnologyData[] = loadTechnologiesCSV(
      path.join(__dirname, 'data', 'tecnologies.csv')
    );

    for (const tech of technologiesData) {
      await prisma.technology.upsert({
        where: { id: tech.id },
        update: {
          name: tech.nome,
          description: tech.descricao,
          icon: tech.imagem,
          destaque: tech.destaque,
        },
        create: {
          id: tech.id,
          name: tech.nome,
          description: tech.descricao,
          icon: tech.imagem,
          destaque: tech.destaque,
        },
      });
    }
    console.log('Technologies seeded successfully');
  } catch (error) {
    console.error('Error seeding technologies:', error);
  }
}

async function seedProjects() {
  try {
    const projectsData: ProjectData[] = loadProjectsCSV(
      path.join(__dirname, 'data', 'projects.csv')
    );

    for (const project of projectsData) {
      try {
        const imageArray = JSON.parse(project.imagens.replace(/'/g, '"'));

        await prisma.project.upsert({
          where: { id: project.id },
          update: {
            name: project.nome,
            description: project.descricao,
            tipo: project.tipo,
            imageUrl: imageArray,
            nivel: project.nivel,
            repositorio: project.repositorio,
            destaque: project.destaque,
          },
          create: {
            id: project.id,
            name: project.nome,
            description: project.descricao,
            tipo: project.tipo,
            imageUrl: imageArray,
            nivel: project.nivel,
            repositorio: project.repositorio,
            destaque: project.destaque,
          },
        });
      } catch (error) {
        console.error(`Error processing project ${project.id}:`, error);
      }
    }
    console.log('Projects seeded successfully');
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
}

async function main() {
  try {
    await seedTechnologies();
    await seedProjects();
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error during seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function run() {
  await main();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
