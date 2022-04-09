import { Router } from "express";
import userController from "../controllers/users.controller";

const userRouter = Router();

//create user
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: user's name
 *              password:
 *                  type: string
 *                  description: user's password.
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: barush@gmail.com
 *              password: password
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      UserCreate:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: user's email
 *              password:
 *                  type: string
 *                  description: user's password.
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: barush@gmail.com
 *              password: password
 */

/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Create a new User
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/UserCreate'
 *      responses:
 *          200:
 *              description: Created new User!   
 */
userRouter.post('/signup', userController.signup);
/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Login
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Logged in!
 *          404:
 *              description: Wrong credentials.   
 */
userRouter.post('/signin', userController.signin);


export default userRouter;