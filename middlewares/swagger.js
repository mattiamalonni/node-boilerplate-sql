import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swagger from '../swagger.json';

const router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swagger));

export default router;
