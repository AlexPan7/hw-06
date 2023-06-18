import multer, { FileFilterCallback } from "multer";
import path from "path";
import { RequestHandler } from "express";

const storage = multer.diskStorage({
	destination: "./public/uploads",
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

function checkFileType(
	file: Express.Multer.File,
	cb: FileFilterCallback
): void {
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error("Error: Images Only!"));
	}
}

const uploadMiddleware: RequestHandler = (req, res, next) => {
	multer({
		storage: storage,
		limits: { fileSize: 20000000 }, // limit file size to 20MB
		fileFilter: (
			req: Express.Request,
			file: Express.Multer.File,
			cb: FileFilterCallback
		) => {
			checkFileType(file, cb);
		},
	}).single("thumbnail")(req, res, next);
};

export default uploadMiddleware;
