import { Request, Response } from "express";

import Post from "../../models/post";

export const AddLikeToPost = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		return res.status(404).json({ message: "Post not found" });
	}

	post.likes = post.likes + 1;
	await post.save();

	return res.json(post);
};

export const RemoveLikeFromPost = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		return res.status(404).json({ message: "Post not found" });
	}

	post.likes = post.likes - 1;
	if (post.likes < 0) {
		post.likes = 0;
	}
	await post.save();

	return res.json(post);
};
