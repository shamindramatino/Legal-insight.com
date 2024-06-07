import { Send } from "lucide-react";
import { useContext, useRef } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ChatContext } from "./ChatContext";

// Define the props interface for the ChatInput component
interface ChatInputProps {
  isDisabled?: boolean; // Indicates if the input is disabled
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  // Destructure context values from ChatContext
  const { addMessage, handleInputChange, isLoding, message } = useContext(ChatContext);

  // Log context values for debugging
  console.log("addMessage:", addMessage);
  console.log("handleInputChange:", handleInputChange);
  console.log("message:", message);

  // Create a ref for the textarea element
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  console.log("textareaRef:", textareaRef);

  return (
    <div className="absolute bottom-12 top-30 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full p-4">
            <div className="fixed w-2/5 right-10">
            {/* <div className="fixed w-full sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 right-0 sm:right-10 lg:right-20">  */}
              {/* Textarea for user input */}
              <Textarea
                rows={1}
                ref={textareaRef}
                maxRows={4}
                autoFocus
                onChange={handleInputChange}
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addMessage();
                    textareaRef.current?.focus();
                  }
                }}
                placeholder="Enter your questions?..."
                className="resize-none pr-12 text-base py-3 scrollbar-thumb-red scrollbar-thumb-rounded 
                scrollbar-track-red-lighter 
                scrollbar-w-2 scrolling-touch"
              />
              {/* Button to send message */}
              <Button
                disabled={isLoding || isDisabled}
                className="absolute bottom-1.5 right-[8px]"
                aria-label="send message"
                onClick={() => {
                  addMessage();
                  textareaRef.current?.focus();
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
