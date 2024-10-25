import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const {PORT = 3000} = process.env;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = new DocumentBuilder()
  .setTitle(`API Rest Nestjs and TypeScript a AWS with Terraform`)
  .addBearerAuth()
  .setVersion('1.0')
  .build();

  const swaggerCDN = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.7.2';
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customCssUrl: [`${swaggerCDN}/swagger-ui.css`],
    customJs: [
      `${swaggerCDN}/swagger-ui-bundle.js`,
      `${swaggerCDN}/swagger-ui-standalone-preset.js`,
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Sevidor rodando na porta: http://localhost:${PORT}`);
  console.log(`📄 Swagger is on: http://localhost:${PORT}/api`);
}
bootstrap();
