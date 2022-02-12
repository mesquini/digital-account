import 'dotenv/config';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '@shared/swagger.json';
// import proposalRouters from '@modules/proposal/infra/http/routes/proposal.routes';

const mainRoute = Router();

mainRoute.get('/', (_, res) => {
  return res.status(200).json({ message: 'API - ONLINE' });
});

mainRoute.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    explorer: true,
  }),
);

// mainRoute.use('/proposal', proposalRouters);

export default mainRoute;
