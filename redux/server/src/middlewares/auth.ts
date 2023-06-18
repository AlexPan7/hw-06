import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

const SECRET_KEY = process.env.SECRET_KEY || "some very secret key";

const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		const isCustomAuth = token && token.length < 500;
		let decodedData: string | JwtPayload | null;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, SECRET_KEY);
			req.userId = (decodedData as JwtPayload)?.id;
		} else {
			decodedData = jwt.decode(token as string);
			req.userId = (decodedData as JwtPayload)?.sub;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
