
import { PineconeClient } from '@pinecone-database/pinecone'
export const getPineconeClient = async () => {
  const client = new PineconeClient()
  await client.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: 'gcp-starter',
    
  })

  console.log("const client",client)
  console.log("const client",client.apiKey)
  
  return client
}




// export const getPineconeClient = async (): Promise<PineconeClient> => {
//   return new Promise(async (resolve, reject) => {
//     const client = new PineconeClient();

//     try {
//       await client.init({
//         apiKey: process.env.PINECONE_API_KEY!,
//         environment: 'gcp-starter',
//       });

//       console.log("Pinecone client initialized successfully. API Key:", client.apiKey);
//       resolve(client);
//     } catch (error) {
//       console.error("Error initializing Pinecone client:", error);
//       reject(error);
//     }
//   });
// };

