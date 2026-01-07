import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    content: String,
    mediaUrl: String, 
    postedByType: {
      type: String,
      enum: ["Veteran", "Organization"]
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "postedByType"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
