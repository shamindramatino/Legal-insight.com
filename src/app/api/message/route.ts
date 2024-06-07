import { db } from '@/db'
import { openai } from '@/lib/openai'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { NextRequest } from 'next/server'
import {OpenAIStream,StreamingTextResponse} from "ai"
import { getPineconeClient } from '@/lib/pinecone'
import { SendMessageValidator } from '@/lib/Validators/SendMessageValidator'

export const POST = async (req: NextRequest) => {
  // endpoint for asking a question to a pdf file,handle all the request

  const body = await req.json()
  console.log(" const body",  body)

  const { getUser } = getKindeServerSession()
  const user = getUser()
  console.log("const user ",user)

  const { id: userId } = user

  if (!userId)
    return new Response('Unauthorized', { status: 401 })

  const { fileId, message } =
    SendMessageValidator.parse(body)

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  })

  if (!file)
    return new Response('Not found', { status: 404 })

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId,
    },
  })

// vectorize message
         const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        //  modelName: "text-embedding-3-large", // Set the desired model name here
        });
        console.log(" const embeddings ",  embeddings )

        const pinecone = await getPineconeClient()
        console.log("const pinecone",pinecone)
        const pineconeIndex = pinecone.Index('quill')


        const vectorstore = await PineconeStore.fromExistingIndex(
          embeddings,{
          pineconeIndex,
          namespace:file.id,
        })
        console.log("const vectorstore",vectorstore)

        const results = await vectorstore.similaritySearch(message,4)
        console.log(" const results", results)

        const prevMessage = await db.message.findMany({
          where:{
            fileId
          },
          orderBy:{
            createdAt: "asc"
          },
          take:6,
        })
        console.log(" const prevMessage",  prevMessage)
          //message to openai for response
        const formattedPrevMessages  = prevMessage.map((msg) =>({
          role: msg.isUserMessage ? 
          ("user" as const )
          :("assistant" as const),
          content: msg.text
        }))
        console.log(" const formattedPrevMessages", formattedPrevMessages)

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          temperature:0,
          stream: true,
          messages: [ {
            role: 'system',
            content:
              'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
          },
          {
            role: 'user',
            content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
            
      \n----------------\n
      
      PREVIOUS CONVERSATION:
      ${formattedPrevMessages.map((message) => {
        if (message.role === 'user') 
        return `User: ${message.content}\n`
        return `Assistant: ${message.content}\n`
      })}
      
      \n----------------\n
      
      CONTEXT:
      ${results.map((r) => r.pageContent).join('\n\n')}
      
      USER INPUT: ${message}`,
          },
        ],
        })
        console.log("const response", response)

        const stream =OpenAIStream(response,{
          async onCompletion(completion){
            await db.message.create({
              data:{
                text: completion,
                isUserMessage: false,
                fileId,
                userId
              },
            })
          },
        })
        console.log(" const stream",  stream)

        
return new StreamingTextResponse(stream)


        
}
