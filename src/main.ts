import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';

const db = new ConfigService(`.env.${process.env.NODE_ENV}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV) {
    const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription('Api')
      .setVersion(process.env.npm_package_version)
      .addTag('api')
      .addServer(`http://localhost:${db.get('APP_PORT')}`)
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
  }

  app.use(helmet());

  app.enableCors({
    origin: db.get('APP_CORS').split(','),
  });

  await app.listen(db.get('APP_PORT'));
}

bootstrap();
