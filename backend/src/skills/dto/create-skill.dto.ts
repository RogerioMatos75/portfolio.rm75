import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsBoolean } from 'class-validator';

export class CreateSkillDto {
    @ApiProperty({
        description: 'Nome da habilidade técnica',
        example: 'NestJS'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Indica se a habilidade deve ser destacada',
        default: false
    })
    @IsBoolean()
    featured: boolean;

    @ApiProperty({
        description: 'Descrição detalhada da habilidade',
        required: false
    })
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'URL do ícone representativo da habilidade',
        format: 'url'
    })
    @IsUrl()
    imageUrl: string;
}