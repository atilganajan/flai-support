const express = require('express');
const { initQdrant } = require('./config/qdrant');
const { answerQuestion } = require('./services/ragService');

const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());


initQdrant().catch(console.error);

app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
 
    const response = await answerQuestion(question);
    res.json(response);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 