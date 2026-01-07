import mongoose from "mongoose";

const VeteranSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profession: String,
  hobbies: [String],
  stars: { type: Number, default: 0 },
  level: { type: String, default: "New Veteran" },
  followingVeterans: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Veteran" }
  ],
  followingOrganizations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Organization" }
  ]
});

export default mongoose.model("Veteran", VeteranSchema);
