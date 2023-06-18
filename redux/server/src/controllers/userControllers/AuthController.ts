import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import * as dotenv from "dotenv";

import User from "../../models/user";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "some very secret key";

export const login = async (req: Request, res: Response): Promise<Response> => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid Credentials" });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			SECRET_KEY,
			{ expiresIn: "1h" }
		);

		return res.status(200).json({ result: existingUser, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const registration = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(400).json({ message: "User already exists" });

		if (password !== confirmPassword)
			return res.status(400).json({ message: "Password doesn't match" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			firstName,
			lastName,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			SECRET_KEY,
			{ expiresIn: "1h" }
		);

		return res.status(200).json({
			result: {
				_id: result._id,
				firstName: result.firstName,
				lastName: result.lastName,
				email: result.email,
			},
			token,
		});
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong" });
	}
};
