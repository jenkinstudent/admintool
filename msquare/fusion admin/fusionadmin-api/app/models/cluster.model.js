const mongoose = require("mongoose");

const Cluster = mongoose.model(
  "Cluster",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    zone:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Zone'
    },
    division:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Division'
    }
  }, {
    timestamps: true
  })
);

module.exports = Cluster;