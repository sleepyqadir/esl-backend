import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContainerController } from './container.controller';
import { ContainerSchema } from './container.model';
import { ContainerService } from './container.service';
import { ClientsSchema } from 'src/clients/clients.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'containers', schema: ContainerSchema }, { name: 'clients', schema: ClientsSchema }]),
  ],
  controllers: [ContainerController],
  providers: [ContainerService],
})
export class ContainerModule { }
