import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Portfolio RM75')
    .setDescription('API para gerenciamento de portfólio profissional\n\n**Recursos principais:**\n- Gestão de projetos\n- Catálogo de habilidades técnicas\n- Histórico profissional\n- Formação acadêmica')
    .setVersion('1.2')
    .setContact('Rogerio Matos', 'https://rm75.dev', 'rogerio.matos1975@gmail.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
