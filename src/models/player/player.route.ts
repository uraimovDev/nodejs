import { Router, Request, Response } from 'express';
import { PlayerController } from './player.controller';

const playerRouter = Router();

// get object from controller
const playerController = new PlayerController()

playerRouter.get('/', (req: Request, res: Response) => playerController.getAll(req, res))

playerRouter.post('/', (req: Request, res: Response) => playerController.create(req, res))

// playerRouter.put('/:id', (req: Request, res: Response) => playerController.update(req, res))

// playerRouter.delete('/:id', (req: Request, res: Response) => playerController.delete(req, res))


export default playerRouter