import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConstants } from './utils/constants';

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KAFKA_BROKER],
        sasl: {
          mechanism: 'plain',
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD,
        },
        ssl: true,
      },
      consumer: {
        groupId: 'consumer-food-storage',
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Food Storage Service')
    .setDescription('Food storage microservice API')
    .setVersion('3.0')
    .addTag(
      appConstants.SWAGGER_INGREDIENTS_MODULE,
      'Operations related to ingredients',
    )
    .addTag(
      appConstants.SWAGGER_PURCHASES_MODULE,
      'Operations related to purchases',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
