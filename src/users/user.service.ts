import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly users: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async dropProjectIndexes() {
    await this.users.collection.dropIndex('uid_1');
  }

  async createUser(body: { name: string; email: string; password: string }) {
    const exists = await this.users.findOne({ email: body.email });

    if (exists) throw new BadRequestException('Already exists.');

    const hashedPass = await bcrypt.hashSync(body.password, 8);

    const user = await new this.users({
      name: body.name,
      email: body.email,
      password: hashedPass,
    }).save();

    const token = this._createToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return { user, token };
  }

  async loginUser(body: { email: string; password: string }) {
    const user = await this.users.findOne({ email: body.email });

    if (!user) throw new NotFoundException('No user found');

    const token = this._createToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return { user, token };
  }

  private _createToken({ id, name, email }): any {
    const user = { id, name, email };
    const accessToken = this.jwtService.sign(user);

    return accessToken;
  }
}
