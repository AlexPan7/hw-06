import mongoose, { Document, Schema, Types } from "mongoose";

interface Comment {
	text: string;
	userId: Types.ObjectId;
	likes: number;
	replies: string[];
}

interface Post extends Document {
	title: string;
	body: string;
	status: string;
	name: string;
	userID: string;
	tag: string[];
	categories: string[];
	slug: string;
	thumbnail: string;
	comments: Comment[];
	likes: number;
	views: number;
	createdAt: Date;
}

const postSchema: Schema = new Schema({
	title: { type: String },
	body: { type: String },
	status: { type: String },
	name: { type: String },
	userID: { type: String },
	tag: [{ type: String }],
	categories: [{ type: String }],
	slug: { type: String },
	thumbnail: { type: String },
	comments: [
		{
			text: { type: String, required: true },
			userId: { type: Types.ObjectId, ref: "User" },
			likes: { type: Number, default: 0 },
			replies: [{ type: String }],
		},
	],
	likes: {
		type: Number,
		default: 0,
	},
	views: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const PostModel = mongoose.model<Post>("posts", postSchema);

export default PostModel;
