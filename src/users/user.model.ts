import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});
export interface User {
  name: string;
  email: string;
  password: string;
}
