import { Request, Response } from "express";

const userController = {

    signup: (req: Request, res: Response) => {
        res.send('Signup');
    },

    signin: (req: Request, res: Response) => {
        res.send('Signin');
    },

    changePassword: (req: Request, res: Response) => {
        res.send('Change password');
    },

    resetPassword: (req: Request, res: Response) => {
        res.send('Reset password');
    },

    updateProfile: (req: Request, res: Response) => {
        res.send('Update profile');
    },

    updateAvatar: (req: Request, res: Response) => {
        res.send('Update avatar');
    }
}

export default userController;