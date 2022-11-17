const mongoose = require("mongoose");
const dbUrl = `mongodb+srv://pekinSearch:penkinsearch2022@pekinsearchdb.0dppjk3.mongodb.net/?retryWrites=true&w=majority`;

// MongoDB initialisation
const InitiateMongoDBServer = async () => {
    try {
      await mongoose.connect(dbUrl, {
        useNewUrlParser: true
      });
      console.log("Connected to DB !!");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  
  //export to use across the
  module.exports = InitiateMongoDBServer;