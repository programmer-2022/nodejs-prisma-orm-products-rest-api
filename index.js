import express from 'express';
import morgan from 'morgan';

import './src/config/config-env.js';
import { environment } from './src/utils/constants.js';

// Routes Files
import productRoutes from './src/routes/products.routes.js';
import categoriesRoutes from './src/routes/categories.routes.js';

const app = express();
const globalPrefix = '/api';

// Middlewares
app.use(express.json());
app.use(morgan('tiny'))

// Routes
app.use(`${globalPrefix}/products`, productRoutes);
app.use(`${globalPrefix}/categories`, categoriesRoutes);

// Listener
app.listen(environment.port, () => {
  console.log(`Server listening on port ${ environment.port }`);
});