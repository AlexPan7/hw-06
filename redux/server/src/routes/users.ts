import { Router } from "express";

import * as AuthController from "../controllers/userControllers/AuthController";
import * as UserController from "../controllers/userControllers/UserController";

const router = Router();

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully authenticated
 *       '400':
 *         description: Invalid credentials
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully registered
 *       '400':
 *         description: User already exists or password doesn't match
 */
router.post("/registration", AuthController.registration);

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Returns a list of users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users.
 */
router.get("/list", UserController.getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User data
 *       '404':
 *         description: User not found
 */
router.get("/:id", UserController.getUser);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Update a user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated
 *       '404':
 *         description: User not found
 */
router.patch("/:id", UserController.updateUserProfile);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted
 *       '404':
 *         description: User not found
 */
router.delete("/:id", UserController.deleteUser);

export default router;
