import { Router } from "express";

import uploadMiddleware from "../middlewares/upload";
import * as PostController from "../controllers/postControllers/PostController";
import * as PostLikeController from "../controllers/postControllers/PostLikeController";
import * as PostCommentController from "../controllers/postControllers/PostCommentController";
import * as PostViewController from "../controllers/postControllers/PostViewController";

const router = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve a list of posts
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: A list of posts.
 */
router.get("/", PostController.getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post data
 *       '404':
 *         description: Post not found
 */
router.get("/:id", PostController.getPost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               tag:
 *                 type: string
 *               categories:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully created post
 */
router.post("/", uploadMiddleware, PostController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     tags: [Posts]
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
 *     responses:
 *       '200':
 *         description: Successfully updated
 *       '404':
 *         description: Post not found
 */
router.patch("/:id", PostController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
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
 *         description: Post not found
 */
router.delete("/:id", PostController.deletePost);

/**
 * @swagger
 * /posts/{id}/like:
 *   put:
 *     summary: Add a like to a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post updated with a new like
 *       '404':
 *         description: Post not found
 */
router.put("/:id/like", PostLikeController.AddLikeToPost);

/**
 * @swagger
 * /posts/{id}/like:
 *   delete:
 *     summary: Remove a like from a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post updated, like removed
 *       '404':
 *         description: Post not found
 */
router.delete("/:id/like", PostLikeController.RemoveLikeFromPost);

/**
 * @swagger
 * /posts/{id}/comments:
 *   get:
 *     summary: Retrieve all comments from a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of comments.
 *       '404':
 *         description: Post not found
 */
router.get("/:id/comments", PostCommentController.allComments);

/**
 * @swagger
 * /posts/{id}/comments:
 *   post:
 *     summary: Add a comment to a post by ID
 *     tags: [Posts]
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
 *     responses:
 *       '200':
 *         description: Comment added
 *       '404':
 *         description: Post not found
 */
router.post("/:id/comments", PostCommentController.addCommentToPost);

/**
 * @swagger
 * /posts/{id}/comments/{commentId}/like:
 *   patch:
 *     summary: Add a like to a comment
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comment updated with a new like
 *       '404':
 *         description: Comment not found
 */
router.patch(
	"/:id/comments/:commentId/like",
	PostCommentController.likeComment
);

/**
 * @swagger
 * /posts/{id}/comments/{commentId}/reply:
 *   patch:
 *     summary: Add a reply to a comment
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Comment updated with a new reply
 *       '404':
 *         description: Comment not found
 */
router.patch(
	"/:id/comments/:commentId/reply",
	PostCommentController.replyComment
);

/**
 * @swagger
 * /posts/{id}/viewcount:
 *   patch:
 *     summary: Increase view count of a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: View count increased
 *       '404':
 *         description: Post not found
 */

router.patch("/:id/viewcount", PostViewController.viewCount);

export default router;
