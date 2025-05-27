
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const N8N_WEBHOOK_URL = "https://projectsample.app.n8n.cloud/webhook/lead"; // Replace with your n8n webhook URL

app.post("/", async (req, res) => {
  const { name, email, company, message } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and Email are required" });

  try {
    await axios.post(N8N_WEBHOOK_URL, { name, email, company, message });
    res.status(200).json({ message: "Lead submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error forwarding to n8n" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
