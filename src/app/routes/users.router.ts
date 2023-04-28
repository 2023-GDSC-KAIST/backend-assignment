import express, { Router } from 'express';
import { UserController } from '../controllers';

const router: Router = express.Router();

/* Get all users */
router.get('/', UserController.getAllUsers);

/* Get user by ID */
router.get('/:id', UserController.getUserById);

/* Update user by ID */
router.put('/:id', UserController.updateUserById);

/* Delete user by ID */
router.delete('/:id', UserController.deleteUserById);

/* Create new user */
router.post('/signup', UserController.createUser);

/* Login user */
router.post('/login', UserController.loginUser);

export const usersRouter: Router = router;
