// import { inferRouterOutputs} from "@trpc/server"
// import { AppRouter } from "@/trpc"

// type RouterOutput = inferRouterOutputs<AppRouter>

// type Messages = RouterOutput["getFileMessages"]["messages"]

// type OmitText = Omit<Messages[number], "text">

// type ExtendedText = {
//     text: string | JSX.Element
// }

// export type ExtendedMessage = OmitText & ExtendedText


// Import necessary utilities and types from TRPC
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc";

// Define type aliases based on TRPC router outputs

// Infer the output types of the AppRouter
type RouterOutput = inferRouterOutputs<AppRouter>;

// Extract the type of the 'messages' field from the output of the 'getFileMessages' query
type Messages = RouterOutput["getFileMessages"]["messages"];

// Omit the 'text' field from each individual message type
type OmitText = Omit<Messages[number], "text">;

// Define a type representing additional properties that can be added to each message
type ExtendedText = {
    text: string | JSX.Element;
};

// Combine the omitted 'text' field from each message type with the extended 'text' field
export type ExtendedMessage = OmitText & ExtendedText;