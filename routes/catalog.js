const express = require("express");
const router = express.Router();

// require controller modules
const items_controller = require("../controllers/items_controller");

// ITEMS
router.get("/", items_controller.index);
router.get("/items", items_controller.item_list);
router.get("/item/create", items_controller.item_create_get);
router.post("/item/create", items_controller.item_create_post);
router.get("/item/:id", items_controller.item_details);
router.get("/item/:id/update", items_controller.item_update_get);
router.post("/item/:id/update", items_controller.item_update_post);
router.get("/item/:id/delete", items_controller.item_delete_get);
router.post("/item/:id/delete", items_controller.item_delete_post);

module.exports = router;
