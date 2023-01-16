import * as mongoose from 'mongoose';

export const ClientsSchema = new mongoose.Schema({
    name: { type: String, },
    clientId: { type: String, unique: true },
    containers: { type: Array<String> },
    email: { type: String }
});
export interface Clients {
    name: string;
    clientId: string
    containers: Array<{ type: string }>
    email: string
}
