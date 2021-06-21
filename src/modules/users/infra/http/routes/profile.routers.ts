import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthticated from '../middlewares/ensureAuthenticate';

const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.use(ensureAuthticated)

profileRouter.put('/',profileController.update)
profileRouter.get('/',profileController.show)
export default profileRouter
