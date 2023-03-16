const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add the contact name"] },
    email: { type: String, required: [true, "Please add the contact's email address"] },
    password: { type: String, required: [true, "Please add the contact's phone number'"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
