const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  pages: [{ type: Schema.Types.ObjectId, ref: "Page" }],
  icon: {
    type: String
  },
  creationDate: {
    type: String,
  },
  updateDate: {
    type: String
  }
});
module.exports = mongoose.model("New", userSchema);
