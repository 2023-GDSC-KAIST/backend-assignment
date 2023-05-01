import express, { Router } from 'express';
import { UserController } from '../controllers';

const router: Router = express.Router();

router.get('/', UserController.get);

router
  .route('/:id')
  .get(UserController.getByUserId)
  .put(UserController.updateByUserId)
  .delete(UserController.deleteByUserId);

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

export const usersRouter: Router = router;
