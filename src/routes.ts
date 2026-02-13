import { Router } from 'express';
import userRouter from './models/user/user.route';
import commentRoute from './models/comment/comment.route';
import playerRouter from './models/player/player.route';

const router = Router();

router.use('/users', userRouter)
router.use('/comments', commentRoute)
router.use('/players', playerRouter)


export default router