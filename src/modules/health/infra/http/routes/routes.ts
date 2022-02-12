import { Router } from 'express';

import GetHealthController from '../controllers/GetHealthController';

const healthRoute = Router();

const getHealthController = new GetHealthController();

healthRoute.get('/health', getHealthController.handle);

export default healthRoute;
