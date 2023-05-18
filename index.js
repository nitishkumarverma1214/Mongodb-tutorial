const connectDB = require("./config/dbconfig");
const User = require("./model/user");

connectDB();

const createUser = async () => {
  try {
    const user = await User.create({
      name: "Nitish",
      age: 23,
      email: "n@.co",
      createdAt: new Date(),
      updatedAt: new Date(),
      hobbies: ["singing", "coding"],
      address: {
        street: "Deepa no2",
        city: "Airoli",
      },
    });
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

const findUser = async () => {
  const existingUser = await User.findOne({ _id: "6466226e18f296e306293786" });
  // other methods are:
  //User.findById
  //User.find
  console.log(existingUser);

  //Using the where
  const userWithAgeGreaterThan23 = await User.where("age")
    .gte("23")
    .limit(2)
    .select("hobbies");
  console.log(userWithAgeGreaterThan23);

  // Add the bestFriend
  console.log("Updated User");
  existingUser.bestFriend = "6466226e18f296e306293786";
  const updatedUser = await existingUser.save();
  console.log(updatedUser);

  // populate the bestFriend -- its like a join
  const populatedUser = await updatedUser.populate("bestFriend");

  console.log(populatedUser);
};

const deleteUser = async () => {
  console.log("deleted user");
  const res = await User.deleteOne({ name: "Nitish" });
  console.log(res);
};

const usingInstanceMethod = async () => {
  const user = await User.findById("6466226e18f296e306293786");

  // use the instance method
  user.sayHi();
};

const usingSchemaMethods = async () => {
  const user = await User.findByName("Nitish");
  console.log(user);
};

const accessVirtualProperty = async () => {
  const user = await User.findOne({ email: "n@n.com" });
  console.log(user.namedEmail);
};

const schemaMiddleWare = async () => {
  const user = await User.findOne({ email: "n@n.com" });
  console.log(user);

  user.name = "NKV";
  await user.save();
  console.log(user);
};
// createUser();
// findUser();
// deleteUser();
// usingInstanceMethod();
// usingSchemaMethods();
// accessVirtualProperty();
schemaMiddleWare();
