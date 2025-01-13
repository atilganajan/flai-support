const { createEmbedding, generateAnswer } = require('./openaiService');
const { client, COLLECTION_NAME } = require('../config/qdrant');

async function answerQuestion(question) {
  try {
    const questionEmbedding = await createEmbedding(question);
 
    const searchResult = await client.search(COLLECTION_NAME, {
      vector: questionEmbedding,
      limit: 5,
      with_payload: true, 
      with_vectors: false 
    });

    console.log(searchResult);

    const payloads = searchResult.map(item => item.payload.conversation);
    
    const answer = await generateAnswer(question, payloads);
    
    return {
      answer
    };
  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
}

module.exports = { answerQuestion }; 