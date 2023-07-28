const db = require('../models');

const {user:User} = db;

exports.registerUser = async (userData) => {
  try {
    const newUser = new User(userData);

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    throw error;
  }
};

exports.authenticateUser = async (email,password) => {
  try {
    const user = await User.findOne({email: email,password:password});
    if(user)
      return user;
    else
      return false;
    

  } catch (error) {
    throw error;
  }
};
