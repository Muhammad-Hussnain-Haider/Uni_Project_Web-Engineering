import express from "express";
import Event from "../models/Event.js";
import Veteran from "../models/Veteran.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/interested", async (req, res) => {
  try {
    const { veteranId, eventId } = req.body;

    const veteran = await Veteran.findById(veteranId);
    const event = await Event.findById(eventId);

    if (!veteran || !event) return res.status(404).json({ message: "Veteran or Event not found" });

    if (!veteran.hobbies.includes(event.type)) {
      return res.status(400).json({ message: "Cannot join this event. Hobby mismatch!" });
    }

    if (event.interestedVeterans.map(id => id.toString()).includes(veteranId)) {
      return res.json({ message: "Already marked Interested" });
    }

    event.interestedVeterans.push(veteranId);
    await event.save();

    res.json({ message: "Event marked as Interested successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/city/:city", async (req, res) => {
  try {
    const events = await Event.find({ city: req.params.city }).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/invite", async (req, res) => {
  try {
    const { eventId, veteranIds } = req.body;

    if (!veteranIds || veteranIds.length === 0)
      return res.status(400).json({ message: "No veterans provided" });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    let invitedCount = 0;

    for (let vid of veteranIds) {
      const veteran = await Veteran.findById(vid);
      if (!veteran) continue;

      if (!veteran.hobbies.includes(event.type)) continue;

      if (!event.invitedVeterans.map(id => id.toString()).includes(vid)) {
        event.invitedVeterans.push(vid);
        invitedCount++;
      }
    }

    await event.save();
    res.json({ message: `Invited ${invitedCount} veterans` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
