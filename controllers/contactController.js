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
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send({ message: "please fill out all fields" });
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    password,
  });

  res.status(201).json(contact);
});

// @desc Get single contact
// @route GET api/contacts/:id
// @access public
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
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
  res.status(200).json({ message: `contact ${req.params.id} updated` });
});

// @desc Delete single contact
// @route DELETE api/contacts/:id
// @access public
const deleteSingleContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `contact ${req.params.id} deleted` });
});

module.exports = { getContact, createContact, getSingleContact, updateSingleContact, deleteSingleContact };
