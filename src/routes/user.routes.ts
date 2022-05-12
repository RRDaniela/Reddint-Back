import { Router } from "express";
import userController from "../controllers/users.controller";
import { authentication } from "../middlewares/authentication";
import upload from "../middlewares/multer";

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

/**
 * @swagger
 * 
 * /users/{id}:
 *  get:
 *      summary: Get the user with the id
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: user_id
 *        schema:
 *          type: string
 *          required: true
 * 
 *      responses:
 *          200:
 *              description: Get the user with the id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          404:
 *              description: User not found
 */
 userRouter.get('/:user_id', userController.getUserById);

 userRouter.put('/avatar/:user_id', authentication ,upload.single('avatar') ,userController.putAvatar);

userRouter.delete('/avatar/:user_id', authentication ,userController.deleteAvatar);

export default userRouter;