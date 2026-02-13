import { Router, Request, Response } from 'express';
import { UserController } from './user.controller';

const userRouter = Router();

// get object from controller
const userController = new UserController()

userRouter.get('/', (req: Request, res: Response) => userController.getAll(req, res))

userRouter.post('/', (req: Request, res: Response) => userController.create(req, res))

userRouter.put('/:id', (req: Request, res: Response) => userController.update(req, res))

userRouter.delete('/:id', (req: Request, res: Response) => userController.delete(req, res))


export default userRouter