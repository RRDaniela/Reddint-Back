import { Router } from "express";
import postController from "./posts.controller";

const router = Router();

router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.post('/', postController.create);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);


export default router;