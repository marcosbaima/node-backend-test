import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.route';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routers';

const routes = Router();


routes.use('/users/authenticate', sessionsRouter);


routes.use('/users/create', usersRouter);

routes.use('/users/update', usersRouter);

routes.use('/users/list', usersRouter);

routes.use('/users/delete', usersRouter);



export default routes;
