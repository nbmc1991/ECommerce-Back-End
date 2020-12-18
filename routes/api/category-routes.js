const router = require('express').Router();
//importing models
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // // storing the categoryData in a variable once the promise is resolved
  const categoryInfo = await Category.findAll({
    include: [{ model: Product }],
  });
  return res.json(categoryInfo);
  // be sure to include its associated Products
});

// // http://localhost:PORT/
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const catData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  return res.json(catData)
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  /* req.body should look like this...
    {"category_name": "name"}
  */
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// // http://localhost:PORT/api/category/:id
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this...
   {"category_name": "name"}
 */
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!catData) {
      res.status(404).json({
        message: "No category found with that id!",
      });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
