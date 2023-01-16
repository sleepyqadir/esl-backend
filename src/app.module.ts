import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ContainerModule } from './containers/container.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://sleep:12345@nest-pd.2m32c.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    UserModule,
    ClientsModule,
    ContainerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
