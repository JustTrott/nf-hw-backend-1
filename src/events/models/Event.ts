import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
	name: string;
	description: string;
	date: Date;
	location: string;
	duration: string;
	rating: number;
}

const EventSchema: Schema = new Schema({
	id: { type: Number, required: true, unique: true },
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	date: { type: Date, default: Date.now },
	location: { type: String, required: true },
	duration: { type: String, required: true },
	rating: { type: Number, default: 0, required: true },
});

const Event = mongoose.model<IEvent>("Event", EventSchema);

export default Event;
