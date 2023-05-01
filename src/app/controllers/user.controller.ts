import { NextFunction, Request, Response } from 'express';
import { User } from '../schemas';
import * as bcrypt from 'bcrypt';

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getByUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateByUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export async function deleteByUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      name: req.body.name,
      email: req.body.email,
    });
    res.json(user.toJSON());
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    /* 중복 체크 */
    if (!user) {
      return res.status(401).send('Username not found');
    }

    /* 비밀번호 체크 */
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send('Invalid password');
    }
    res.json(user.toJSON());
  } catch (error) {
    next(error);
  }
}
