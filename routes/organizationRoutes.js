import express from "express";
import Organization from "../models/Organization.js";
import Veteran from "../models/Veteran.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const org = await Organization.create(req.body);
    res.json(org);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/follow", async (req, res) => {
  try {
    const { veteranId, organizationId } = req.body;

    const org = await Organization.findById(organizationId);
    const vet = await Veteran.findById(veteranId);

    if (!org || !vet) return res.status(404).json({ message: "Organization or Veteran not found" });

    if (org.followers.map(id => id.toString()).includes(veteranId)) {
      return res.json({ message: "Already following organization" });
    }

    org.followers.push(veteranId);
    vet.followingOrganizations.push(organizationId);

    await org.save();
    await vet.save();

    res.json({ message: "Organization followed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
