const mongoose = require('mongoose');

// Define a schema for each department member
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String },
  departmentID: { type: String, required: true },
  emailAddress: { type: String, required: true },
  password: {type:String,required:true},
});

// Define a schema for the community
const communitySchema = new mongoose.Schema({
  AdvisorMentor: [memberSchema],
  Training: [memberSchema],
  Marketing: [memberSchema],
  ExportImport: [memberSchema],
  WebsiteAndAppHandling: [memberSchema],
  Finance: [memberSchema]
});

// Create a model for the community
const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
