import { Document, model, Schema } from "mongoose";

export interface statInterface extends Document {
  discordId: string;
  name: string;
  kill: number;
  death: number;
}

export const Stat = new Schema({
  discordId: String,
  name: String,
  kill: {
    type: Number,
    default: 0,
  },
  death: {
    type: Number,
    default: Date.now(),
  },
});

export default model<statInterface>("Stat", Stat);