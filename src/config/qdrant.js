require('dotenv').config();
const { QdrantClient } = require("@qdrant/js-client-rest");


const client = new QdrantClient({ 
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY
});

const COLLECTION_NAME = "conversations_simplified";

async function initQdrant() {
  try {
    // Koleksiyon var mı kontrol et
    const collections = await client.getCollections();

    console.log('Qdrant Cloud bağlantısı başarılı');
  } catch (error) {
    console.error('Qdrant başlatma hatası:', error);
    throw error;
  }
}

module.exports = { client, COLLECTION_NAME, initQdrant }; 