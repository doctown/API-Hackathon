var mongoose = require('mongoose');
var app = require('../server.js');
var characterData = require('../../data/gameOfThrones');
var Schema = mongoose.Schema;

var characterSchema = new Schema({
  "name": String,
  "nickname": String,
  "house": String,
  "imageUrl": String
});

var Character = mongoose.model('Character', characterSchema);

(function () {
  console.log('Creating the database ...');
  Character.find(characterData.data[0], function(err, character) {
    if (err) {
      console.log(err);
    } else if (character.length === 0) {
      Character.create(characterData.data, function(err, characters) {
        if (err) {
          console.log(err);
        } else {
          console.log('Database has been populated.');
        }
      });
    }
  });
})();

module.exports = Character;
