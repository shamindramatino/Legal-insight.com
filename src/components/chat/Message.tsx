import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import { Icons } from '../icons';
import { format } from 'date-fns';
import { forwardRef } from 'react';

// Define the props interface for the Message component
interface MessageProps {
    message: ExtendedMessage; // The message object
    isNextMessageSamePerson: boolean; // Indicates if the next message is from the same person
}

// Define the Message component as a forwardRef component to forward refs to the underlying DOM element
const Message = forwardRef<HTMLDivElement, MessageProps>(({
    message,
    isNextMessageSamePerson
}, ref) => {
    return (
        // Container div for the message
        <div
            ref={ref}
            className={cn('flex items-end', {
                "justify-end": message.isUserMessage,
            })}
        >
            {/* User avatar or bot logo */}
            <div className={cn("relative flex h-6 w-6 aspect-square items-center justify-center", {
                "order-2 bg-blue-600 rounded-sm": message.isUserMessage,
                "order-1 bg-zinc-800 rounded-sm": !message.isUserMessage,
                invisible: isNextMessageSamePerson,
            })}>
                {/* Conditional rendering of user avatar or bot logo */}
                {message.isUserMessage ? (
                    <Icons.user className='fill-zinc-200 text-zinc-200 h-3/4' />
                ) : (
                    <Icons.logo className='fill-zinc-300 h-3/4 w-3/4' />
                )}
            </div>
            {/* Message content */}
            <div className={cn("flex flex-col space-y-2 text-base max-w -md mx-2", {
                "order-1 item-end": message.isUserMessage,
                'order-2 items-start': !message.isUserMessage,
            })}>
                {/* Message bubble */}
                <div className={cn("px-4 py-2 rounded-lg inline-block", {
                    "bg-blue-600 text-white": message.isUserMessage,
                    "bg-gray-200 text-gray-900": !message.isUserMessage,
                    "rounded br-none": !isNextMessageSamePerson && message.isUserMessage,
                    "rounded-bl-none": !isNextMessageSamePerson && !message.isUserMessage,
                })}>
                    {/* Render message text as plain text or Markdown */}
                    {typeof message.text === "string" ? (
                        <ReactMarkdown 
                            className={cn("prose", {
                                "text-zinc-50": message.isUserMessage
                            })}
                        >
                            {message.text}
                        </ReactMarkdown>  
                    ) : (
                        message.text
                    )}
                    {/* Render message timestamp if it's not a loading message */}
                    {message.id !== "loading-message" ? (
                        <div 
                            className={cn("text-xs select-none mt-2 w-full text-right", {
                                "text-zinc-500": !message.isUserMessage,
                                "text-zinc-300": message.isUserMessage,
                            })}
                        >
                            {/* Format and display message timestamp */}
                            {format(new Date(message.createdAt), 'HH:mm')}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
});

// Set display name for the Message component (useful for debugging)
Message.displayName = 'Message';

export default Message;
