import mongoose from "mongoose";
import { Request, Response } from "express";
import * as dotenv from "dotenv";

import Post from "../../models/post";

dotenv.config();

const PORT = process.env.PORT || "3010";

export const getPost = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id } = req.params;
	try {
		const post = await Post.findById(id);
		return res.status(200).json(post);
	} catch (error) {
		console.log(error);
		return res.status(404).json({ message: (error as Error).message });
	}
};

export const getPosts = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { page } = req.query;
	try {
		const LIMIT = 15;
		const startIndex = (Number(page as string) - 1) * LIMIT;
		const total = await Post.countDocuments({});
		const posts = await Post.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);
		return res.status(200).json({
			data: posts,
			currentPage: Number(page as string),
			numberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		return res.status(404).json({ message: (error as Error).message });
	}
};

export const createPost = async (
	req: Request,
	res: Response
): Promise<Response> => {
	if (req.file == undefined) {
		return res.json({ message: "Error: No File Selected!" });
	}

	const { title, body, tag, categories, slug } = req.body;
	const fullUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

	const post = new Post({
		title,
		body,
		tag,
		categories,
		slug,
		thumbnail: fullUrl,
	});

	try {
		const newPost = await post.save();
		return res.json(newPost);
	} catch (err) {
		return res.json({ message: (err as Error).message });
	}
};

export const updatePost = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id: _id } = req.params;
	const post = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that ID");
	const updatedPost = await Post.findByIdAndUpdate(
		_id,
		{ ...post, _id },
		{ new: true }
	);
	return res.json(updatedPost);
};

export const deletePost = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("No post with that ID");
	await Post.findByIdAndRemove(id);
	return res.json({ message: "Post deleted successfully" });
};
