const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  number: {
    type: Number,
    require: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  creationDate: {
    type: String,
  },
  updateDate: {
    type: String
  }
});
module.exports = mongoose.model("Page", pageSchema);