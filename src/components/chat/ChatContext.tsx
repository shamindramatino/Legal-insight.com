import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { useMutation } from "@tanstack/react-query";
import { createContext, ReactNode, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";

// Define the shape of the response object provided by the ChatContext
type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
    ) => void
  isLoding: boolean;
};

// Create the ChatContext with default values
export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoding: false,
});

// Define the props interface for the ChatContextProvider component
interface Props {
  fileId: string;
  children: ReactNode;
}

// ChatContextProvider component to provide the chat functionality to its children
export const ChatContextProvider = ({ fileId, children }: Props) => {
  // State for tracking the input message
  const [message, setMessage] = useState<string>("");
  // State to track loading state
  const [isLoding, setIsLoading] = useState<boolean>(false);
  // Reference to backup message
  const backupMessage = useRef("");
  // trpc utils
  const utils = trpc.useContext();
  // Toast hook
  const { toast } = useToast();

  // Mutation hook for sending messages
  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      // Send message to the server
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
      });

      // Throw error if response is not ok
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      return response.body;
    },

    // onMutate function
    onMutate: async ({ message }) => {
      // Backup the current message
      backupMessage.current = message;
      setMessage(""); // Clear the input field

      // Cancel ongoing file messages query
      await utils.getFileMessages.cancel();

      // Get previous messages
      const previousMessages = utils.getFileMessages.getInfiniteData();

      // Update the pages with new message
      utils.getFileMessages.setInfiniteData(
        { fileId, limit: INFINITE_QUERY_LIMIT },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            };
          }

          // Create a new message and add it to the top of the list
          let newPages = [...old.pages];
          let latestPage = newPages[0]!;
          latestPage.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ];
          newPages[0] = latestPage;

          return {
            ...old,
            pages: newPages,
          };
        }
      );

      // Set loading state
      setIsLoading(true);

      // Return previous messages for rollback in case of error
      return {
        previousMessages:
          previousMessages?.pages.flatMap((page) => page.messages) ?? [],
      };
    },

    // onSuccess function
    onSuccess: async (stream) => {
      setIsLoading(false); // Disable loading state
      if (!stream) {
        // If stream is not available, show error toast
        return toast({
          title: "There was a problem sending this message",
          description: "Please refresh this page and try again",
          variant: "destructive",
        });
      }

      // Process the stream data
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accResponse = ""; // Accumulate response data

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        accResponse += chunkValue;

        // Update the message with the accumulated response
        utils.getFileMessages.setInfiniteData(
          { fileId, limit: INFINITE_QUERY_LIMIT },
          (old) => {
            if (!old) return { pages: [], pageParams: [] };

            // Check if AI response is already created
            let isAiResponseCreated = old.pages.some((page) =>
              page.messages.some((message) => message.id === "ai-response")
            );

            // Update the pages with AI response
            let updatedPages = old.pages.map((page) => {
              if (page === old.pages[0]) {
                let updatedMessages;
                if (!isAiResponseCreated) {
                  updatedMessages = [
                    {
                      createdAt: new Date().toISOString(),
                      id: "ai-response",
                      text: accResponse,
                      isUserMessage: false,
                    },
                    ...page.messages,
                  ]
                } else {
                  updatedMessages = page.messages.map((message) => {
                    if (message.id === "ai-response") {
                      return {
                        ...message,
                        text: accResponse,
                      };
                    }
                    return message;
                  });
                }
                return {
                  ...page,
                  messages: updatedMessages,
                };
              }
              return page;
            });
            return { ...old, pages: updatedPages };
          }
        );
      }
    },

    // onError function
    onError: (_, __, context) => {
      // Restore the backup message
      setMessage(backupMessage.current);
      // Rollback to previous messages
      utils.getFileMessages.setData(
        { fileId },
        { messages: context?.previousMessages ?? [] }
      );
    },

    // onSettled function
    onSettled: async () => {
      setIsLoading(false); // Disable loading state
      await utils.getFileMessages.invalidate({ fileId }); // Invalidate the query
    },
  });

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // Function to add a message
  const addMessage = () => sendMessage({ message });

  return (
    // Provide the ChatContext values to its children
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoding,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
