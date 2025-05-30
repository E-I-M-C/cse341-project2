const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
//#swagger.tags=['Contact'];
/* #swagger.security = [{
  "OAuth2": [
    'read_contacts'
  ]
}] */
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
//#swagger.tags=['Contact'];
/* #swagger.security = [{
  "OAuth2": [
    'read_contacts'
  ]
}] */
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts[0]);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createContact = async (req, res) => {
//#swagger.tags=['Contact'];
/* #swagger.security = [{
  "OAuth2": [
    'write_contacts'
  ]
}] */
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    favoriteFood: req.body.favoriteFood,
    favoriteNumber: req.body.favoriteNumber,
    birthday: req.body.birthday
  };
  try {
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact');
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

const updateContact = async (req, res) => {
//#swagger.tags=['Contact'];
/* #swagger.security = [{
  "OAuth2": [
    'write_contacts'
  ]
}] */
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    favoriteFood: req.body.favoriteFood,
    favoriteNumber: req.body.favoriteNumber,
    birthday: req.body.birthday
  };
  try {
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact');
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

const deleteContact = async (req, res) => {
//#swagger.tags=['Contact'];
/* #swagger.security = [{
  "OAuth2": [
    'write_contacts'
  ]
}] */
  const contactId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact');
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};