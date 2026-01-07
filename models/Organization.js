import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  name: String,
  type: String,
  followers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Veteran" }
  ]
});

export default mongoose.model("Organization", OrganizationSchema);
