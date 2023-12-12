const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsStandSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  news: [{ type: Schema.Types.ObjectId, ref: "New" }],
  icon: {
    type: String
  },
  color: {
    type: String
  },
  creationDate: {
    type: String,
  },
  updateDate: {
    type: String
  }
});
module.exports = mongoose.model("NewsStand", newsStandSchema);
