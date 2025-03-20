import { Request, Response, RequestHandler, NextFunction } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = process.env.API_BASE_URL;

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  body: string;
}

export const getTopUsers = async (req: Request, res: Response) => {
  try {
    const { data: posts } = await axios.get<Post[]>(`${BASE_URL}/posts`);

    const userPostCount: Record<number, number> = {};
    posts.forEach(post => {
      userPostCount[post.userId] = (userPostCount[post.userId] || 0) + 1;
    });

    const topUsers = Object.entries(userPostCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([userId, postCount]) => ({ userId: Number(userId), postCount }));

    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getPosts: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const type = req.query.type as "popular" | "latest";

    const { data: posts } = await axios.get<Post[]>(`${BASE_URL}/posts`);
    const { data: comments } = await axios.get<Comment[]>(`${BASE_URL}/comments`);

    if (type === "latest") {
      const latestPosts = posts
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);
      res.json(latestPosts);
      return;
    }

    if (type === "popular") {
      const postCommentCount: Record<number, number> = {};
      comments.forEach(comment => {
        postCommentCount[comment.postId] = (postCommentCount[comment.postId] || 0) + 1;
      });

      const maxComments = Math.max(...Object.values(postCommentCount));
      const popularPosts = posts.filter(post => postCommentCount[post.id] === maxComments);

      res.json(popularPosts);
      return;
    }

    res.status(400).json({ error: "Invalid" });
    return;
  } catch (error) {
    next(error); 
  }
};

