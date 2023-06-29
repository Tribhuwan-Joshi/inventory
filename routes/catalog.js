const express = require("express");
const router = express.Router();

// multer setup
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// require controller modules
const item_controller = require("../controllers/item_controller");
const category_controller = require("../controllers/category_controller");

// ITEMS
router.get("/", item_controller.index);
router.get("/items", item_controller.item_list);
router.get("/item/create", item_controller.item_create_get);
router.post(
  "/item/create",
  upload.single("itemImage"),
  item_controller.item_create_post
);
router.get("/item/:id", item_controller.item_details);
router.get("/item/:id/update", item_controller.item_update_get);
router.post("/item/:id/update", item_controller.item_update_post);
router.get("/item/:id/delete", item_controller.item_delete_get);
router.post("/item/:id/delete", item_controller.item_delete_post);

// Cateogry
router.get("/categories", category_controller.category_list);
router.get("/category/create", category_controller.category_create_get);
router.post("/category/create", category_controller.category_create_post);
router.get("/category/:id", category_controller.category_details);
router.get("/category/:id/update", category_controller.category_update_get);
router.post("/category/:id/update", category_controller.category_update_post);
router.get("/category/:id/delete", category_controller.category_delete_get);
router.post("/category/:id/delete", category_controller.category_delete_post);

module.exports = router;
