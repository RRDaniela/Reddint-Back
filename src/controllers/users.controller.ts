import { Request, Response } from 'express';
import User from '../models/User.model';
import { passwordHelper } from '../helpers/password.helper';
import { jwtHelper } from '../helpers/jwt.helper';
import { getSourceMapRange } from 'typescript';

const userController = {
    signup: async (req: Request, res: Response) => {
        const { email, username, password } = req.body;

        const foundUser = await User.findOne({ email });

        if (foundUser) {
            return res.status(409).json({
                message: 'User already exists',
            });
        }

        const user = new User({
            email,
            username,
            password: await passwordHelper.hash(password),
        });

        try {
            await user.save();
            res.status(201).send(user);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    signin: async (req: Request, res: Response) => {
        const { email, password } = req.body;
    
        const foundUser = await User.findOne({ email });

        console.log(`email: ${email}`);

        if (!foundUser) {
            return res.status(401).json({
                message: 'User not found',
            });
        }

        const isPasswordValid = await passwordHelper.compare(password, foundUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }

        const token = jwtHelper.sign({
            email: foundUser.email,
            userId: foundUser._id,
        });

        res.status(200).json({
            token,
        });
    },
    getUserById: async (req: Request, res: Response) => {
       try{
        const { user_id } = req.params;
        const user = await User.findById(user_id);
        res.status(200).send(user);
    }catch(error){
        res.status(500).json({message: error});
    }}
    };



export default userController;