import { Router, Request, Response } from 'express';
import { CommentController } from './comment.controller';

const commentRoute = Router();

// get object from controller
const controller = new CommentController()

commentRoute.get('/', (req: Request, res: Response) => controller.getAll(req, res))

commentRoute.post('/', (req: Request, res: Response) => controller.create(req, res))

commentRoute.put('/', (req: Request, res: Response) => controller.update(req, res))

commentRoute.delete('/:id', (req: Request, res: Response) => controller.delete(req, res))


export default commentRoute