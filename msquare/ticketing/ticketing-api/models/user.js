
    // models/user.js

    const mongoose = require('mongoose');

    const user = mongoose.model(
      "user",
      new mongoose.Schema({

        
      }, {
        timestamps: true
      })
    );

    module.exports = user;
  