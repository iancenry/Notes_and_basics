const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
}, {
    timestamps: true,
});
  

let User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;