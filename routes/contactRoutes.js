const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  getSingleContact,
  updateSingleContact,
  deleteSingleContact,
} = require("../controllers/contactController.js");

router.route("/").get(getContact).post(createContact);

router.route("/:id").get(getSingleContact).put(updateSingleContact).delete(deleteSingleContact);

module.exports = router;
