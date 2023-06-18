import { Request, Response } from "express";
import { Document, Types } from "mongoose";

import Post from "../../models/post";
import User from "../../models/user";

interface Comment {
	text: string;
	userId: string;
	likes: number;
	replies: string[];
}

interface PostDocument extends Document {
	comments: Types.DocumentArray<Comment & Document>;
}

export const addCommentToPost = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = await User.findById(req.body.userId);
		let userId = req.body.userId;
		if (!user) {
			userId = "ghost";
		}
		const post = (await Post.findById(req.params.id)) as PostDocument;
		if (!post) throw new Error("Post not found");
		post.comments.push({
			text: req.body.text,
			userId: userId,
			likes: 0,
			replies: [],
		});
		await post.save();
		res.status(201).json(post);
	} catch (error) {
		res.status(404).json({ message: (error as Error).message });
	}
};

export const allComments = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const post = (await Post.findById(req.params.id)) as PostDocument;
		if (!post) throw new Error("Post not found");
		res.status(201).json(post.comments);
	} catch (error) {
		res.status(404).json({ message: (error as Error).message });
	}
};

export const likeComment = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const post = (await Post.findById(req.params.id)) as PostDocument;
		if (!post) throw new Error("Post not found");
		const comment = post.comments.id(req.params.commentId);
		if (!comment) throw new Error("Comment not found");
		comment.likes++;
		await post.save();
		res.json(post);
	} catch (error) {
		res.status(404).json({ message: (error as Error).message });
	}
};

export const replyComment = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const post = (await Post.findById(req.params.id)) as PostDocument;
		if (!post) throw new Error("Post not found");
		const comment = post.comments.id(req.params.commentId);
		if (!comment) throw new Error("Comment not found");
		comment.replies.push(req.body.text);
		await post.save();
		res.json(post);
	} catch (error) {
		res.status(404).json({ message: (error as Error).message });
	}
};
