const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require("bcryptjs");

const getAll = async (req, res) => {
//#swagger.tags=['User'];
/* #swagger.security = [{
  "OAuth2": [
    'read_users'
  ]
}] */
  try {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((user) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
//#swagger.tags=['User'];
/* #swagger.security = [{
  "OAuth2": [
    'read_users'
  ]
}] */
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({ _id: userId });
    result.toArray().then((user) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(user[0]);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
  
};

const createUser = async (req, res) => {
//#swagger.tags=['User'];
/* #swagger.security = [{
  "OAuth2": [
    'write_users'
  ]
}] */
  let hashedPassword
  try {
    hashedPassword = bcrypt.hashSync(req.body.password, 10);
  } catch (err) {
    res.status(500).json({ message: err });
  }

  const user = {
    username: req.body.username,
    password: hashedPassword
  };
  try {
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user');
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

const updateUser = async (req, res) => {
//#swagger.tags=['User'];
/* #swagger.security = [{
  "OAuth2": [
    'write_users'
  ]
}] */
  const userId = new ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  try {
    const response = await mongodb.getDb().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

const deleteUser = async (req, res) => {
//#swagger.tags=['User'];
/* #swagger.security = [{
  "OAuth2": [
    'write_users'
  ]
}] */
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user');
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};