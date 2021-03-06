const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const RolUserSchema = new Schema({
  rolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rol',
  },
});

const UserSchema = new Schema({
  email: {
    type: String,
    // required: true,
    // unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  userFile: {
    type: String,
  },
  rol: [
    // type: Schema.Types.ObjectId,
    // ref: 'Rol',
    RolUserSchema,
  ],
  avatar: {
    type: String,
  },
  phone: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  address: {
    type: String,
  },
  birthday: {
    type: Date,
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model('User', UserSchema);
