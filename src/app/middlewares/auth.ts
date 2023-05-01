import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../schemas';

export async function checkToken(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.headers.token) {
      const token = (req.headers.token as string).split('Bearer ')[1];
      const userId = jwt.verify(token, process.env.SECRET_KEY as string);
      const user = await User.findById(userId);
      return res.json(user);
    }
    next();
  } catch (error) {
    next(error);
  }
}
