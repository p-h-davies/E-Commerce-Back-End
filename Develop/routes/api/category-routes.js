const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

//Find category by ID
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, { include: [Product] }).then((categoryData) => {
    res.json(categoryData);
  });
});

//Create a category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Update a category by ID
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedBook) => {
      res.json(updatedBook);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });

});

// delete a category by ID
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
    onDelete: 'cascade',
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
