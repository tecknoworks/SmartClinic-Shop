var express = require("express");
var router = express.Router();

const CartService = require('../services/CartService');

router.get("/", CartService.get);
router.get("/:id", CartService.getById);
router.get("/user/:id", CartService.getByUserId);
router.get("/drugs/:id", CartService.drugsByCart);

router.post("/", CartService.post);
router.post("/addDrug", CartService.addDrugToCart);

router.delete("/:id", CartService.remove);
router.delete("/:cartId/:drugId", CartService.deleteDrugFromCart);

module.exports = router;