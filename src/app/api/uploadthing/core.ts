import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { 
  createUploadthing, 
  type FileRouter } from "uploadthing/next";
import {PDFLoader} from'langchain/document_loaders/fs/pdf'
import { getPineconeClient } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";
 
const f = createUploadthing();
console.log("const f",f)

const middleware = async ()=>{
  const { getUser } = getKindeServerSession()
      const user = getUser()

  if (!user || !user.id) throw new Error('Unauthorized')
  const subscriptionPlan = await getUserSubscriptionPlan()   
  return { subscriptionPlan, userId:user.id }
}

const onUploadComplete = async ({
  metadata, 
  file,
}:{
  metadata: Awaited<ReturnType <typeof middleware>>
  file:{
    key:string
    name: string
    url: string
  }
})=>{
   
  const isFileExist = await db.file.findFirst({
    where:{
      Key: file.key
    },
  })

  if(isFileExist) return


  const createdFile = await db.file.create({
    data:{
     Key: file.key,
     name: file.name,
     userId: metadata.userId,
     url: `https://utfs.io/f/${file.key}`,
     UploadStatus:'PROCESSING',
    },
   })
    
  const apiKey = "sk_live_3ce2aae59b8719c7abb134784409085835238ef69f7ead811c4d5e0ee03e7016"
   try{
     console.log("createdFile object:", createdFile);
     // getting the file
     //https://utfs.io/f/ce416630-e220-4463-bc83-3a86d3b9af4a-hgp4h0.pdf?apiKey=sk_live_3ce2aae59b8719c7abb134784409085835238ef69f7ead811c4d5e0ee03e7016%0A
     const response = await fetch(`https://utfs.io/f/${file.key}?apiKey=${apiKey}`)
     console.log("const response",response)
     const blob = await response.blob()
    console.log("const blob",blob)

     const loader = new PDFLoader(blob)
    console.log("const loader", loader )

     const pageLevelDocs = await loader.load()
     console.log("const pageLevelDocs",pageLevelDocs)

     const pageAmt = pageLevelDocs.length
     console.log(" const pageAmt",pageAmt)
     const {subscriptionPlan} = metadata
     const {isSubscribed} = subscriptionPlan

     const isProExceeded = 
     pageAmt > 
     PLANS.find((plan) => plan.name ==="Pro")!.pagesPerPdf
     console.log(" const isProExceeded",isProExceeded)
     const isFreeExceeded = 
     pageAmt > PLANS.find((plan) => plan.name ==="Free")!.pagesPerPdf
     console.log("const isFreeExceeded",isFreeExceeded)
    
     if(
         (isSubscribed && isProExceeded) || 
         (!isSubscribed && isFreeExceeded)
     ){
       await db.file.update({
         data:{
           UploadStatus:"FAILED"
         },
         where:{
           id: createdFile.id,
         },
       })
     }
     
     // vectorize and index entire document
     const pinecone = await getPineconeClient()
     console.log("const pinecone",pinecone)
     const pineconeIndex = pinecone.Index('quill')
     console.log("Pinecone Index created:", pineconeIndex),
     console.log("Pinecone Index created:", pineconeIndex.upsert)

     const embeddings = new OpenAIEmbeddings({
       openAIApiKey: process.env.OPENAI_API_KEY,
     //  modelName: "text-embedding-3-large", // Set the desired model name here
     });
     console.log("const embeddings", embeddings)
       await PineconeStore.fromDocuments(
         pageLevelDocs,
         embeddings,
         {
           pineconeIndex,
           namespace: createdFile.id,
         }
       );       
     await db.file.update({
       data:{
         UploadStatus:"SUCCESS"
       },
       where:{
         id: createdFile.id,
       },
     })
     console.log( PineconeStore.fromDocuments)
   }catch(err)  
   {
     await db.file.update({
       data:{
         UploadStatus:"FAILED",
       },
       where:{
         id: createdFile.id,
       },
     })
   }
}

 
export const ourFileRouter = {
  freePlanUploder: f({ pdf: { maxFileSize: '4MB' } }) 
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
    proPlanUploder: f({ pdf: { maxFileSize: '16MB' } }) 
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter