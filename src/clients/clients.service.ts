import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common/exceptions';
import { Clients } from './clients.model';

@Injectable()
export class ClientsService {
    constructor(
        @InjectModel('clients') private readonly clients: Model<Clients>,
    ) { }

    async addClient(body) {
        const exists = await this.clients.findOne({ clientId: body.id });
        if (exists) throw new BadRequestException('Already exists.');

        const client = await new this.clients({
            clientId: body.id.toString(),
            containers: [],
            name: body.name,
            email: `${body.name.split(" ")[0]}@gmail.com`
        }).save();

        return client;
    }

    async getAllClients() {
        try {
            const clients = await this.clients.find({});
            return clients;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve clients');
        }
    }

    async updateClient(body) {
        console.log(body);
        const container = await this.clients.findOneAndUpdate({
            clientId: body.id
        }, {
            $set: { clientId: body.updatedId, name: body.name, email: body.email }
        });

        console.log(container);

        if (!container) throw new NotFoundException('No container found');

        return container;
    }


}
