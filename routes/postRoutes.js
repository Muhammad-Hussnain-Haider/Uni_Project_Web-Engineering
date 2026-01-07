import express from "express";
import Post from "../models/Post.js";
import Veteran from "../models/Veteran.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/feed/:veteranId", async (req, res) => {
  try {
    const veteran = await Veteran.findById(req.params.veteranId);
    if (!veteran) return res.status(404).json({ message: "Veteran not found" });

    const posts = await Post.find({
      $or: [
        { postedByType: "Veteran", postedBy: { $in: veteran.followingVeterans } },
        { postedByType: "Organization", postedBy: { $in: veteran.followingOrganizations } }
      ]
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/follow/veteran", async (req, res) => {
  try {
    const { veteranId, targetVeteranId } = req.body;
    const veteran = await Veteran.findById(veteranId);
    if (!veteran) return res.status(404).json({ message: "Veteran not found" });

    if (veteran.followingVeterans.map(id => id.toString()).includes(targetVeteranId)) {
      return res.json({ message: "Already following this veteran" });
    }

    veteran.followingVeterans.push(targetVeteranId);
    await veteran.save();

    res.json({ message: "Veteran followed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
