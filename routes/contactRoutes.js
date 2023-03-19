const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  getSingleContact,
  updateSingleContact,
  deleteSingleContact,
} = require("../controllers/contactController.js");
const validateToken = require("../middleware/validateTokenHandler.js");

router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getSingleContact).put(updateSingleContact).delete(deleteSingleContact);

module.exports = router;
