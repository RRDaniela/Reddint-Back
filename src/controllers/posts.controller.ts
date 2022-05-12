import { Request, Response } from "express";
import Posts from "../models/Posts.model";
import Comments from "../models/Comments.model";
import Subreddint from "../models/Subreddint.model";
import User from "../models/User.model";

const PostsController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const posts = await Posts.find().populate('subreddint');
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    getPost: async (req: Request, res: Response) => {
        try {
            
            const { post_id } = req.params;
            const post = await Posts.findById(post_id).populate('subreddint');

            if(!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const comments = await Comments.find({ post: post._id });


            res.status(200).json({...post, comments});
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    getSubreddintPosts: async (req: Request, res: Response) => {
        try {
            const subreddint = await Posts.find({ subreddint: req.params.subreddintId }).populate('subreddint');
            res.status(200).json(subreddint);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    getSubreddintPostsName: async (req: Request, res: Response) => {
        try {
            const subreddint = await Posts.find({ subreddint: req.params.name }).populate('subreddint');
            res.status(200).json(subreddint);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.userId;
            const subreddintName = req.body.subreddint;

            const subreddint = await Subreddint.findOne({ name: subreddintName });

            if (!subreddint) {
                return res.status(404).json({
                    message: 'Subreddint not found'
                });
            }


            const post = new Posts({
                title: req.body.title,
                body: req.body.body,
                subreddint: subreddint._id,
                owner: userId,
                comments: []
            });
            await post.save();
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    update: async (req: Request, res: Response) => {
        try {

            const userId = req.body.user.userId;

            const match = await Posts.findById(req.params.id);

            if (!match) {
                return res.status(404).json({
                    message: 'Post not found'
                });
            }

            if (match.owner.toString() !== userId) {
                return res.status(401).json({
                    message: 'You are not authorized to update this post'
                });
            }

            match.title = req.body.title;
            match.body = req.body.body;

            await match.save();
            res.status(200).json(match);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const match = await Posts.findById(req.params.id);

            if (!match) {
                return res.status(404).json({
                    message: 'Post not found'
                });
            }

            await match.remove();
            res.status(200).json(match);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    upvote: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const match = await Posts.findById(id);

            if (!match) {
                return res.status(404).json({
                    message: 'Post not found'
                });
            }


            match.upvotes = match.upvotes + 1;

            await match.save();
            
            const author = await User.findById(match.owner);

            if (author) {
                author.karma += 1;
                await author.save();
            }

            return res.status(200).json({ message: 'Post upvoted' });

        } catch (e) {
            return res.status(500).json({ message: e });
        }
    },
    downvote: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const match = await Posts.findById(id);

            if (!match) {
                return res.status(404).json({
                    message: 'Post not found'
                });
            }

            match.downvotes = match.downvotes + 1;

            await match.save();
            const author = await User.findById(match.owner);

            if (author) {
                author.karma -= 1;
                await author.save();
            }

            return res.status(200).json({ message: 'Post downvoted' });

        } catch (e) {
            return res.status(500).json({ message: e });
        }
    },
}

export default PostsController;
