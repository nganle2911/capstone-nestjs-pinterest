import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(express.static(".")) 

  // Start server 
  const PORT = process.env.PORT || 8080; 
  await app.listen(PORT, () => {
    console.log("JSON Server is running"); 
  });
}
bootstrap();
