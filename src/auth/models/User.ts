import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
	email: string;
	username?: string;
	city: string;
	password: string;
}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	city: { type: String, required: true },
	username: { type: String },
	password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
