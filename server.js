const express = require('express');
const mqtt = require('mqtt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MQTT Setup
const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
});

app.get('/led/:state', (req, res) => {
  const state = req.params.state === 'on' ? '1' : '0';
  mqttClient.publish('esp32/led', state);
  res.send(`LED state sent: ${state}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
