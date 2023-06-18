import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const userSchema: Schema = new Schema({
	id: {
		type: String,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
