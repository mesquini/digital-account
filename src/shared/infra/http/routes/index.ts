import 'dotenv/config';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '@shared/swagger.json';
import digitalAccountRouters from '@modules/digital-account/infra/http/routes/digitalAccount.routes';
import transferRouters from '@modules/digital-account/infra/http/routes/transfer.routes';

const mainRoute = Router();

mainRoute.get('/', (_, res) => {
  return res.status(200).json({ message: 'API - Digital Account' });
});

mainRoute.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    explorer: true,
  }),
);

mainRoute.use('/digital-account', digitalAccountRouters);
mainRoute.use('/transfer', transferRouters);

export default mainRoute;
