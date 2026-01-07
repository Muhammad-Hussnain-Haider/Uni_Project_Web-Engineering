import express from "express";
import Veteran from "../models/Veteran.js";
import Organization from "../models/Organization.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "your_secret_key";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, profession } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role === "Veteran") {
      user = await Veteran.create({ name, email, password: hashedPassword, profession });
    } else if (role === "Organization") {
      user = await Organization.create({ name, email, password: hashedPassword });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET);
    res.json({ token, role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;
    if (role === "Veteran") {
      user = await Veteran.findOne({ email });
    } else if (role === "Organization") {
      user = await Organization.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET);
    res.json({ token, role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
