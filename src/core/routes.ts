import { Router } from "express";
import userRouter from "../modules/users/user.routes";
import postRouter from "../modules/posts/posts.routes";
import commentRouter from "../modules/comments/comments.routes";
import subreddintRouter from "../modules/subreddints/subreddints.routes";
import messageRouter from "../modules/messages/message.routes";

const router = Router();

// Register routes here

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/subreddints", subreddintRouter);
router.use("/messages", messageRouter);



export default router;