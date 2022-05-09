import { Router } from "express";
import commentsController from "./comments.controller";

const router = Router();

router.get("/:id", commentsController.getOne);
router.post("/", commentsController.create);
router.put("/:id", commentsController.update);
router.delete("/:id", commentsController.delete);

export default router;