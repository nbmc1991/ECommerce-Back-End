const router = require('express').Router();
//importing models
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // // storing the categoryData in a variable once the promise is resolved
  const categoryData = await Category.findAll().catch((err) => {
    res.json(categoryData);
  });

  // be sure to include its associated Products
  // try {
  //   const categoryInfo = await Category.findAll({
  //     include: [{ model: Product }, { model: ProductTag }, { model: Tag }],
  //   });
  //   res.status(200).json(categoryInfo);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

// // http://localhost:PORT/
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const categoryId = await Category.findByPk().catch((err) => {
    res.json(err);
  });
  res.json(categoryId);

  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req, body);
    // // 200 status code means the req is succesfull
    res.status(200).json(newCategory);
  } catch (err) {
    // // 400 status code means the server could not understand req
    res.status(400).json(err);
  }
});

// // http://localhost:PORT/api/category/:id
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      name: req.body.name,
    },
    {
      //getting WHERE  the category based onthe id given in the request parameter //
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => res.json(updatedCategory))
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => res.json(deletedCategory))
    .catch((err) => res.json(err));
});

module.exports = router;
