import { Request, Response } from "express";
import mongoose from "mongoose";

import User, { IUser } from "../../models/user";

export const deleteUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const user = (await User.findById(req.params.id)) as IUser;
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	await User.findByIdAndDelete(req.params.id);

	return res.json({ message: "User deleted" });
};

export const updateUserProfile = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id: _id } = req.params;
	const profile = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("User not found");

	const updatedProfile = (await User.findByIdAndUpdate(
		_id,
		{ ...profile, _id },
		{ new: true }
	)) as IUser;

	return res.json(updatedProfile);
};

export const getUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id } = req.params;

	try {
		const user = (await User.findById(id)) as IUser;
		return res.status(200).json(user);
	} catch (error: any) {
		console.log(error);
		return res.status(404).json({ message: error.message });
	}
};

export const getUsers = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const users = (await User.find()) as IUser[];
	const privateFields = users.map((user) => {
		return {
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		};
	});
	return res.json(privateFields);
};
