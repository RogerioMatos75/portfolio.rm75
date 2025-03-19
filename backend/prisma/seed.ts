import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

const prisma = new PrismaClient();

interface TechnologyData {
    id: string;
    nome: string;
    destaque: string;
    descricao: string;
    imagem: string;
}

async function main() {
    try {
        const csvFilePath = path.resolve(__dirname, './data/tecnologies.csv');
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

        const records: TechnologyData[] = await new Promise((resolve, reject) => {
            const results: TechnologyData[] = [];
            fs.createReadStream(csvFilePath)
                .pipe(parse({ columns: true, delimiter: ',' }))
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });

        console.log(`Iniciando migração de ${records.length} tecnologias...`);

        for (const record of records) {
            await prisma.technology.create({
                data: {
                    name: record.nome,
                    description: record.descricao,
                    icon: record.imagem,
                    category: 'development', // Categoria padrão
                },
            });
        }

        console.log('Migração concluída com sucesso!');
    } catch (error) {
        console.error('Erro durante a migração:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();