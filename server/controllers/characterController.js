var Character = require('../models/Character.js');

// Create our necessary controller methods to perform all needed CRUD actions

exports.createOne = function(req, res) {
  var character = req.body;
  // Create a new character with the new character
  new Character(character).save(function(err, character) {
    if (err) {
      console.log(err);
    } else if (!character) {
      res.send('Character was not created ...')
    } else {
      res.send(character._id + ' was created');
    }

  });
};

exports.retrieve = function(req, res) {
  Character.find({}, function (err, characters) {
    res.send(characters);
  });
};

exports.retrieveOne = function(req, res) {
  var query = {_id: req.params.id};
  Character.findOne(query, function(err, matchingCharacter) {
    if (err) {
      res.sendStatus(500);
    } else if (!matchingCharacter) {
      res.send("Character cannot be found!")
    } else {
      res.send(matchingCharacter);
    }
  })
};

exports.updateOne = function(req, res) {
  var id = {_id: req.params.id};
  console.log(id);
  var query = req.query;
  console.log(query);
  Character.where(id).update(query, function(err, character) {
    if (err) {
      res.sendStatus(500);
    } else if (!character) {
      res.send(id + ' Not Found! Could not be updated.');
    } else {
      res.send(id._id + ' was updated with values ...' + JSON.stringify(query));
    }
  });
};

exports.deleteAll = function(req, res) {
  Character.find({}).remove().exec(function(err, characters) {
    if (err) {
      res.sendStatus(500);
    } else {
      var totalCharacters = characters.length + ' ' || '';
      res.send('All ' + totalCharacters + 'characters have been deleted');
    }
  });
};

exports.deleteOne = function(req, res) {
  var query = {_id: req.params.id};
  Character.findByIdAndRemove(query, function(err, character) {
    if (err) {
      res.sendStatus(500);
    } else if (!character) {
      res.send('Could not find id to delete ...');
    } else {
      res.send(character._id + ' was deleted');
    }
  });
};