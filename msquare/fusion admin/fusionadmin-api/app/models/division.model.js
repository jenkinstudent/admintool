const mongoose = require("mongoose");

const Division = mongoose.model(
  "Division",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    zone:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Zone'
    }
  }, {
    timestamps: true
  })
);

module.exports = Division;