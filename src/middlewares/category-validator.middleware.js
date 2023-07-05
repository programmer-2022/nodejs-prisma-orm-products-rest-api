import { categoryDto } from '../validators/dtos/category.dto.js';
import { prisma } from '../utils/db.js';

export const validateBodyCategory = (req, res, next) => {
  const { error } = categoryDto.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Parametros invalidos al crear una categoria',
      error: error.details[0].message
    });
  }
  next();
};

export const validateCategoryByName = async (req, res, next) => {

  const categoryFound = await prisma.category.findUnique({
    where: { name: req.body.name }
  })

  if(categoryFound) 
    return res.status(400).send({
      message: 'El nombre de la categoria ya existe en la base de datos',
      error: 'Registro duplicado'
    })
  
  next();
}