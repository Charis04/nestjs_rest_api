import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
// Importing ThrottlerModule and ThrottlerGuard for rate limiting
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
// Importing APP_GUARD to register ThrottlerGuard globally
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([{
      name: "short",
      ttl: 1000, // Time to live for each request in milliseconds (1 second)
      limit: 3, // Limit to 3 requests per second
      },
      {
        name: "long",
        ttl: 60000, // Time to live for each request in milliseconds (1 minute)
        limit: 100, // Limit to 100 requests per minute
      }
    ])
  ],
  controllers: [AppController],
  // The AppService is provided globally, but you can also provide it in specific modules if needed.
  // This allows you to inject AppService into any controller or service in the application.
  providers: [AppService, {
    provide: APP_GUARD, // Register ThrottlerGuard globally
    useClass: ThrottlerGuard, // Use ThrottlerGuard to apply rate limiting
  }],
})
export class AppModule {}
