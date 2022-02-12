import 'dotenv/config';
import { Router } from 'express';
import healthRoute from '@modules/health/infra/http/routes/routes';

const healthRoutes = Router();

healthRoutes.use(healthRoute);

export default healthRoutes;
