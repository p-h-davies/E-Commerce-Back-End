const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', (req, res) => {
  Category.findAll().then((categoryData) => {
    res.json(categoryData);
  });
});

//Find category by ID
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id).then((categoryData) => {
    res.json(categoryData);
  });
});

//Create a category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category,
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
      id: req.body.id,
      category_name: req.body.category,
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
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
