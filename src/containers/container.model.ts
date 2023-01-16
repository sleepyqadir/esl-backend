import * as mongoose from 'mongoose';

export const ContainerSchema = new mongoose.Schema({
  containerId: { type: String, unique: true },
  date: { type: Date },
  clientId: { type: String }
});
export interface Container {
  containerId: string;
  date: Date;
  clientId: string,
}
