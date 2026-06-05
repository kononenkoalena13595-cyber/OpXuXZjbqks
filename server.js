const express = require('express');
const app = express();
app.use(express.json());

const activeBots = {};

app.post('/fetch-bot', (req, res) => {
  const botId = `bot_${Date.now()}`;
  activeBots[botId] = { id: botId, startedAt: new Date() };
  console.log(`Bot ${botId} spawned`);
  res.json({ success: true, botId });
});

app.post('/kill-bot', (req, res) => {
  const { botId } = req.body;
  if (activeBots[botId]) {
    delete activeBots[botId];
    return res.json({ success: true });
  }
  res.status(404).json({ error: 'Bot not found' });
});

app.get('/status', (req, res) => {
  res.json({ activeBots: Object.keys(activeBots).length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
