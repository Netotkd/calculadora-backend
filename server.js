const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/gemini', async (req, res) => {
  const { apiKey, prompt } = req.body;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `Crie um título e uma descrição para um anúncio do Google Ads sobre: ${prompt}`
    );
    const response = result.response;
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar texto: " + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
