const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");
const { contactValidation } = require("../middleware/reqValidationHandler.js");

// @desc Get all contacts
// @route GET api/contacts
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create contacts
// @route POST api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = await contactValidation.validateAsync(req.body);

  const contact = await Contact.create({
    name,
    email,
    phone,
    password,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

// @desc Get single contact
// @route GET api/contacts/:id
// @access private
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found in database");
  }

  res.status(200).json(contact);
});

// @desc Update single contact
// @route PUT api/contacts/:id
// @access private
const updateSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found in database");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user is unauthorized!!");
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedContact);
});

// @desc Delete single contact
// @route DELETE api/contacts/:id
// @access private
const deleteSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found in database");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user is unauthorized");
  }

  await Contact.findByIdAndDelete(contact);

  res.status(200).json({ message: `contact ${req.params.id} deleted` });
});

module.exports = { getContact, createContact, getSingleContact, updateSingleContact, deleteSingleContact };
