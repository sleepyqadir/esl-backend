import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsService } from './clients.service';
import { ClientsSchema } from './clients.model';
import { ClientsController } from './clients.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'clients', schema: ClientsSchema }]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
