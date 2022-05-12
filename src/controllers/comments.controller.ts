import { Request, Response } from "express";
import { Types } from "mongoose";
import Comment from "../models/Comments.model";
import Post from "../models/Posts.model";
import User from "../models/User.model";

const CommentController = {
  create: async (req: Request, res: Response) => {
    try {
      const userId = req.body.user.userId;
      const postId = req.body.post_id;

      const comment = new Comment({
        body: req.body.body,
        upvotes: 0,
        downvotes: 0,
        post: new Types.ObjectId(postId),
        owner: new Types.ObjectId(userId),
      });

      await comment.save();

      return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
        const { post_id } = req.params;   

        const post = await Post.findById(post_id);

        if(!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comments = await Comment.find({ post: post._id });

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
  },
  vote: (mode: 'upvote' | 'downvote') => async (req: Request, res: Response) => {
    try {
        
        const { comment_id } = req.params;

        const comment = await Comment.findById(comment_id);

        if(!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const author = await User.findById(comment.owner);

        if(mode === 'upvote') {
            comment.upvotes++;
            if(author) {
              author.karma++;
              await author.save();  
            }
        } else {
            comment.downvotes++;
            if(author) {
              author.karma--;
              await author.save();  
            }
        }

        await comment.save();

        return res.status(200).json(comment);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
  }
};

export default CommentController;
