import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { NatsModule } from '@bivajon/common';

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getEnvVar('DB_HOST'),
      port: Number(getEnvVar('DB_PORT')),
      username: getEnvVar('DB_USER'),
      password: getEnvVar('DB_PASSWORD'),
      database: getEnvVar('DB_NAME'),
      entities: [
        User, Admin
      ],
      synchronize: getEnvVar('NODE_ENV') === 'production' ? false: true, // Set to false in production
    }),
    UsersModule,
    AdminModule,
    NatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
