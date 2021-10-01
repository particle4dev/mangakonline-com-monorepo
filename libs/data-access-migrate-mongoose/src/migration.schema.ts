import { Schema, Document, Model, Connection } from 'mongoose';

export interface MigrationDocument extends Document {
  name: string;
  filename: string;
  state: 'up' | 'down';
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type MigrationModel = Model<MigrationDocument>

const MigrationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    enum: ['up', 'down'],
    default: 'down'
  },
}, { timestamps: true });

// indexes
MigrationSchema.index({ createdAt: -1 });
MigrationSchema.index({ updatedAt: -1 });

MigrationSchema.virtual('filename').get(function() {
  return `${this.createdAt.getTime()}-${this.name}.ts`;
});

let model = null;

export default function initializeDB(collection = 'migrations', dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(collection, MigrationSchema);
  }
  return model;
}
