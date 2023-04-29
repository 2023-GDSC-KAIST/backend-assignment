import express, { Router } from 'express';
import { UserController } from '../controllers';

const router: Router = express.Router();

export const usersRouter: Router = router;

router.get('/', UserController.get);

router.get('/:id', UserController.list);

router.put('/:id',UserController.modifyByID);

router.delete('/:id',UserController.delUser);

router.post('/signup', UserController.create);

router.post('/login', UserController.login);
/*
- GET: /users // DB에 있는 모든 유저들의 이름을 반환합니다.
- GET: /users/:id // DB에서 해당 id (mongoDB에서 생성되는 _id)를 가진 유저를 반환합니다.
- PUT: /users/:id // DB에서 해당 id를 가진 유저의 회원정보를 수정합니다.
- DELETE: /users/:id // DB에서 해당 id를 가진 유저의 회원탈퇴를 수행합니다.

- POST: /users/signup // username, password, name, email field를 포함하는 document를 생성합니다.
- POST: /users/login // username, password를 받아 로그인을 수행합니다.
*/