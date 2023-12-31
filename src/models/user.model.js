const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlenght: 4,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  mindSet: {
    type: Array
  },
  dayNote: {
    type: Array
  },
  newsStands: [{ type: Schema.Types.ObjectId, ref: "NewStand" }],
  isAdmin: {
    type: Boolean,
    default: false,
  }
});
module.exports = mongoose.model("User", userSchema);
