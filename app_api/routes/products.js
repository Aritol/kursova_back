var express = require("express");
var router = express.Router();

const productsController = require("../controllers/products");

/* GET список книг. */

router.get("/:category/:id", productsController.getById);
router.get("/:category", productsController.getList);

/* GET видалення книги за id. */
router.delete("/", productsController.delete);

/* POST Створення нової книги. */
router.post("/", productsController.add);

// Оновлення інформації про книгу після редагування
router.put("/", productsController.update);

/* Відображення інформації про одну книгу */

module.exports = router;
