var mongoose = require('mongoose');

var showSchema = mongoose.Schema({
  title: { type: String, required: '{PATH} is required!'},
  featured: { type: Boolean, required: '{PATH} is required!'},
  published: { type: Date, required: '{PATH} is required!'},
  tags: [String]
});

var Show = mongoose.model('Show', showSchema);

function createDefaultShows() {
  Show.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      Show.create({title: 'Terrace House', featured: true, published: new Date(2018, 3, 16, 33), tags: ['TV', 'series', 'reality tv', 'japanese']})
      Show.create({title: 'Serie Noir', featured: true, published: new Date(2018, 3, 16, 33), tags: ['TV', 'series', 'drama']})
      Show.create({title: 'Better Call Saul', featured: true, published: new Date(2018, 3, 16, 33), tags: ['TV', 'series', 'drama']})
    }
  })
}

exports.createDefaultShows = createDefaultShows;


// {title: 'Terrace House', featured: true, published: new Date(2018, 3, 16, 33)},
//       {title: 'Serie Noir', featured: true, published: new Date(2018, 3, 16, 33)},
//       {title: 'Outlander', featured: true, published: new Date(2018, 3, 16, 33)},
//       {title: 'Better Call Saul', featured: true, published: new Date(2018, 3, 16, 33)},
//       {title: 'Fargo', featured: true, published: new Date(2018, 3, 16, 33)},