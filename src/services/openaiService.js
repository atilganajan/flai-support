const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
}

async function generateAnswer(question, context) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Sen, kullanıcılarına nazik ve profesyonel bir şekilde destek sunan bir asistansın. Soruları yanıtlarken, önceki konuşmalardan alınan en uygun 5 cevaba dayanarak, kullanıcıyı memnun eden ve doğrudan cevaplar vermelisin. Cevaplar, doğal ve samimi olmalı; örneğin 'Cevap: ...' gibi ifadeler kullanmamalısın. Her zaman net ve anlaşılır bir dil tercih etmelisin."
      },
      {
        role: "user",
        content: `Bağlam: ${JSON.stringify(context)}\n\nSoru: ${question}`
      }
    ],
  });
  return completion.choices[0].message.content;
}

module.exports = { createEmbedding, generateAnswer }; 