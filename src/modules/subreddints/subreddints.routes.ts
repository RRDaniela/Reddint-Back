import { Router } from "express";
import { subreddintController } from "./subreddints.controller";

const router = Router();

router.get("/", subreddintController.getAll);
router.get("/:id", subreddintController.getOne);
router.post("/", subreddintController.create);
router.put("/:id", subreddintController.update);
router.delete("/:id", subreddintController.delete);


export default router;