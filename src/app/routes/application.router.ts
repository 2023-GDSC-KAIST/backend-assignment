import express, { Router } from 'express';
import { usersRouter } from './users.router';

const router: Router = express.Router();
router.use('/users', usersRouter); // Attach the usersRouter to the /users route of the router using router.use().

export const applicationRouter: Router = router;