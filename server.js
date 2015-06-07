var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Storage = function() {
  this.items = [];
  this.id = 0;
}

Storage.prototype.add = function(name) {
  var item = {id: this.id, name: name};
  this.items.push(item);
  this.id += 1;
  return item;
}

Storage.prototype.delete = function(id) {
  var item = this.items[id];

  for (var i = 0; i < this.items.length; i++) {
    if (id == this.items[i].id) {
      this.items.splice(i,1);
      break;
    }
  }
  return item;
}

Storage.prototype.get = function(id) {
  var item = this.items[id];
  return item;
}

Storage.prototype.update = function(id, name) {
  for (var i = 0; i < this.items.length; i++) {
    if (id == this.items[i].id) {
      this.items[i].name = name;
    }
  }
}
var storage = new Storage();
storage.add("Broad beans");
storage.add("Tomatoes");
storage.add("Cherry");

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
  res.json(storage.items);
})

app.post('/items', jsonParser, function(req, res) {
  if(!req.body) {
    return res.sendStatus(400);
  }
  var item = storage.add(req.body.name);
  console.log(item);
  res.status(201).json(item);
})

app.put('/items/:id', jsonParser, function(req, res) {
  if(!req.body) {
    return res.sendStatus(400);
  }
  if (storage.get(req.params.id) === null || typeof(storage.get(req.params.id)) === 'undefined') {
    return res.sendStatus(404);
  }
  storage.update(req.params.id, req.body.name);
  res.status(200).json(storage.items[req.params.id]);
})
app.delete('/items/:id', function(req, res) {
  if (storage.get(req.params.id) === null || typeof(storage.get(req.params.id)) === 'undefined') {
    return res.sendStatus(404);
  }
  var item = storage.delete(req.params.id);
  res.status(200).json(item);
})
app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;