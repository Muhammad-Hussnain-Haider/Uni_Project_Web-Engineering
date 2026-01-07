import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  type: String, 
  city: String,
  stars: { type: Number, max: 5000 },
  createdBy: String,
  interestedVeterans: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Veteran" }
  ],
  invitedVeterans: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Veteran" }
  ]
});

export default mongoose.model("Event", EventSchema);
