import { NextFunction, Request, Response } from 'express';
import { User } from '../schemas';
import bcrypt from 'bcrypt';
import logger from '../util/logger';

/* Get */
export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
}

/* ModifyByID */
export async function modifyByID(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

/* DelUser */
export async function delUser(req: Request, res: Response, next: NextFunction) {
  const userID = req.params.id;

  try {
    const user = await User.findByIdAndRemove(userID);
    res.json({ message: 'User successfully deleted', user });
  } catch (error) {
    next(error);
  }
}

/* Create */
export async function create(req: Request, res: Response, next: NextFunction) {
  const { username, userID, password, email } = req.body;
  const newUser = new User({ username, userID, password, email });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
}

/* List */
export async function list(req: Request, res: Response, next: NextFunction) {
  const userID = req.params.id;

  try {
    const user = await User.findById(userID);
    logger.info(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

/* Login */
export async function login(req: Request, res: Response, next: NextFunction) {
  const { userID, password } = req.body;

  try {
    const user = await User.findOne({ userID });

    if (!user) {
      return res.status(401).json({ message: 'Invalid userID or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid userID or password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    next(error);
  }
}
