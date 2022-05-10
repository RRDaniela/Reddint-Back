import { Router } from "express";
import PostsController from "../controllers/posts.controller";
import { authentication } from "../middlewares/authentication";

const postsRouter = Router();
//create post
/**
 * @swagger
 * components:
 *  schemas:
 *      Post:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: Post's title
 *              body:
 *                  type: string
 *                  description: Post's text body
 *              subreddint:
 *                  type: string
 *                  description: Subreddint where the post belongs
 *          required: 
 *              - title
 *              - body
 *              - subreddint
 *          example:
 *              title: Spinosaur
 *              body: is the best dinosaur because...
 *              subreddint: Dinos
 */

/**
 * @swagger
 * /posts:
 *  post:
 *      summary: Create a new Post
 *      tags: [Post]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *              description: Created new Post!   
 */


postsRouter.post('/', authentication, PostsController.create);

/**
 * @swagger
 * 
 * /posts/{id}:
 *  get:
 *      summary: Get the post with the id
 *      tags: [Post]
 *      parameters:
 *      - in: path
 *        name: post_id
 *        schema:
 *          type: string
 *          required: true
 * 
 *      responses:
 *          200:
 *              description: Get the post with the id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          404:
 *              description: Post not found
 */
 postsRouter.get('/:post_id', PostsController.getPost);


 
/**
 * @swagger
 * /posts:
 *  get:
 *      summary: Get all posts
 *      tags: [Post]
 *      responses:
 *          200:
 *              description: Get all Posts!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'   
 */
postsRouter.get('/', PostsController.getAll);
/**
 * @swagger
 * /posts/{id}:
 *  get:
 *      summary: Get The subreddint from the post
 *      tags: [Post]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Get the subreddint from the post
 *      responses:
 *          200:
 *              description: Get the subreddint from the post
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Subreddint'
 *          404:
 *              description: Subreddint not found
 */
postsRouter.get('/:name', PostsController.getSubreddintPostsName);
/**
 * @swagger
 * /posts/{id}:
 *  get:
 *      summary: Get The subreddint from the post
 *      tags: [Post]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Get the subreddint from the post
 *      responses:
 *          200:
 *              description: Get the subreddint from the post
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Subreddint'
 *          404:
 *              description: Subreddint not found
 */
postsRouter.get('/:subreddintId', PostsController.getSubreddintPosts);
/**
 * @swagger
 * /posts/{id}:
 *  put:
 *      summary: Update a Post
 *      tags: [Post]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Update a Post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *              description: Post Updated!
 *          404:
 *              description: Post not found!
 */
postsRouter.put('/:id', authentication, PostsController.update);

/**
 * @swagger
 * /posts/{id}:
 *  delete:
 *      summary: Delete a Post
 *      tags: [Post]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Delete a Post
 *      responses:
 *          200:
 *              description: Post deleted!
 *          404:
 *              description: Post not found!
 */
postsRouter.delete('/:id', PostsController.delete);
postsRouter.post('/:id/upvote', PostsController.upvote);
postsRouter.post('/:id/downvote', PostsController.downvote);

export default postsRouter;

