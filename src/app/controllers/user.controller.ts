import { NextFunction, Request, Response } from 'express';
import { User, UserDocument } from '../schemas';

/* Get all users */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users: UserDocument[] = await User.find({}, { _id: 1, username: 1 }).exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

/* Get user by ID */
export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id: string = req.params.id;
    const user: UserDocument | null = await User.findById(id).exec();
    if (!user) {
      res.status(404).send(`User with ID ${id} not found`);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
}

/* Update user by ID */
export async function updateUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id: string = req.params.id;
    const updates: any = req.body;
    const user: UserDocument | null = await User.findByIdAndUpdate(id, updates, { new: true }).exec();
    if (!user) {
      res.status(404).send(`User with ID ${id} not found`);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
}

/* Delete user by ID */
export async function deleteUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id: string = req.params.id;
    const user: UserDocument | null = await User.findByIdAndDelete(id).exec();
    if (!user) {
      res.status(404).send(`User with ID ${id} not found`);
    } else {
      res.status(200).send(`User with ID ${id} deleted`);
    }
  } catch (error) {
    next(error);
  }
}

/* Create new user */
export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password, name, email }: { username: string; password: string; name: string; email: string } = req.body;
    const user: UserDocument = await User.create({ username, password, name, email });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

/* Login user */
export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password }: { username: string; password: string } = req.body;
    const user: UserDocument | null = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
      res.status(401).send('Invalid credentials');
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
}
