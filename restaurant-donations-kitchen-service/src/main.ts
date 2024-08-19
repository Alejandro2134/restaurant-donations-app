import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { appConstants } from './utils/constants';

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KAFKA_BROKER],
      },
      consumer: {
        groupId: 'orders-consumer',
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Kitchen Service')
    .setDescription('Kitchen microservice API')
    .setVersion('3.0')
    .addTag(appConstants.SWAGGER_ORDERS_MODULE, 'Operations related to orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
