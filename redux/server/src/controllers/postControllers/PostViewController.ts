import { Request, Response } from "express";

import Post from "../../models/post";

export const viewCount = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id } = req.params;
	try {
		const post = await Post.findById(id);
		if (!post) {
			throw new Error("Post not found");
		}
		post.views++;
		await post.save();
		return res.json(post);
	} catch (error) {
		return res.status(404).json({ message: (error as Error).message });
	}
};
