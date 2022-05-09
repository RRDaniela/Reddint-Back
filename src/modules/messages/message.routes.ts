import { Router } from "express";
import messageController from "./message.controller"; 


const router = Router();

router.get("/getMyMessages/:id", messageController.getMyMessages);
router.get("/getSentMessages/:id", messageController.getSentMessages);
router.post("/", messageController.create);
router.put("/:id", messageController.update);
router.put('/:id', messageController.delete);

export default router;