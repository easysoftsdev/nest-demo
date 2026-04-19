import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS API Example')
    .setDescription('API documentation for NestJS application')
    .setVersion('1.0')
    .addTag('users', 'User management endpoints')
    .addTag('products', 'Product management endpoints')
    .addBearerAuth() // Add JWT bearer auth if needed
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Swagger UI available at /api/docs

  await app.listen(4002);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger UI available at: http://localhost:3000/api/docs`);
}
void bootstrap();
