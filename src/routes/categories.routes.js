import { Router } from 'express'

import { 
  findAll, 
  findOne,
  findByName,
  create, 
  update, 
  deleteOne 
} from "../controllers/category.controller.js"

import { validateBodyCategory, validateCategoryByName } from '../middlewares/category-validator.middleware.js';

const router = Router();

router.get('/', findAll);
router.get('/search', findByName);
router.get('/:id', findOne);
router.post('/', [validateBodyCategory, validateCategoryByName], create);
router.put('/:id', update);
router.delete('/:id', deleteOne);

export default router;