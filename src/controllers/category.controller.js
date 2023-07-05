import { prisma } from "../utils/db.js";

export const findAll = async (_, res) => {

  const categories = await prisma.category.findMany({
    include: { products: true }
  });

  if(!categories.length)
    res.status(404).send('No existen categorias registradas');

  res.status(200).json({ categories });
}

export const findOne = async (req, res) => {

  const categoryFound = await prisma.category.findUnique({
    where: { id: parseInt(req.params.id) }
  })

  if(!categoryFound) {
    return res.status(404).json({
      message: 'Categoría no existente',
      category: null
    });
  }
    
  res.status(200).send( { category: categoryFound });
}

export const findByName = async (req, res) => {

  const { name } = req.query;

  if (!name)
    return res.status(400).json({ error: 'El nombre de categoría es obligatorio' });
   
  const categoryName = await prisma.category.findUnique({
    where: { name }
  })

  if(!categoryName) {
    return res.status(404).json({
      message: 'Categoría no existente',
      category: null
    });
  }
      
  res.status(200).send( { category:  categoryName });

}

export const create = async (req, res) => {

  const newCategory = await prisma.category.create({
    data: req.body
  })
  
  res.status(201).json( { 
    message: 'Se ha creado una categoria exitosamente',
    category: newCategory 
  });
}

export const update = async (req, res) => { 

  const categoryUpdated = await prisma.category.update({ 
    where: { id: parseInt(req.params.id) },
    data: req.body
  })

  res.status(200).json( { 
    message: 'Updated category successfully',
    category: categoryUpdated
  });
}

export const deleteOne = async (req, res) => { 

  const categoryFound = await prisma.category.findFirst({
    where: { id: parseInt(req.params.id) }
  })

  if(!categoryFound) 
    res.status(404).json('La Categoría que desea eliminar no existe en la base de datos');

  const categoryDelete = await prisma.category.delete({ 
    where: { id: parseInt(req.params.id) },
  })

  res.status(200).json( { 
    message: 'delete category successfully',
    category: categoryDelete
  });
}