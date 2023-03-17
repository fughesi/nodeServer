const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");

// @desc Get all contacts
// @route GET api/contacts
// @access public
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// @desc Create contacts
// @route POST api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    password,
  });

  res.status(201).json(contact);
});

// @desc Get single contact
// @route GET api/contacts/:id
// @access public
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
// @access public
const updateSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found in database");
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedContact);
});

// @desc Delete single contact
// @route DELETE api/contacts/:id
// @access public
const deleteSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found in database");
  }

  // await Contact.remove();
  await Contact.findByIdAndDelete(contact);

  res.status(200).json({ message: `contact ${req.params.id} deleted` });
});

module.exports = { getContact, createContact, getSingleContact, updateSingleContact, deleteSingleContact };
