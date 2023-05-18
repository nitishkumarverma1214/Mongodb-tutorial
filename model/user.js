const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (age) => age > 18,
      message: (props) => `${props.value} is not greater than 18`,
    },
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    minLength: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  hobbies: [String],
  //   address: {
  //     street: String,
  //     city: String,
  //   },
  address: addressSchema,
});

// methods for the instances -can't be an arrow function

userSchema.methods.sayHi = function () {
  console.log(`Hi my name is ${this.name}`);
};

// static methods on the schema

userSchema.statics.findByName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

// adding a virtual property to the schema -- it will not be saved in the database
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

// schema middleware -- pre or post

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});

module.exports = mongoose.model("User", userSchema);
