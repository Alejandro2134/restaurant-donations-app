import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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
        groupId: 'consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap();
