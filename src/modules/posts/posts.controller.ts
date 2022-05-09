import { Request, Response } from "express";

const postController = {
    
    getAll: (req: Request, res: Response) => {
        return res.status(200).json({ hello: 'olis 😈 motomami 😈' });
    },

    getOne: (req: Request, res: Response) => {},

    create: (req: Request, res: Response) => {},

    update: (req: Request, res: Response) => {},

    delete: (req: Request, res: Response) => {}

}

export default postController;