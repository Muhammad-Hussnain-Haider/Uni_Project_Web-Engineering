import express from "express";
import Veteran from "../models/Veteran.js";

const router = express.Router();

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
