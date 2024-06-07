import { trpc } from "@/app/_trpc/client"; // Import TRPC client
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"; // Import query limit
import { Loader2, MessageSquare } from "lucide-react"; // Import icons
import Skeleton from "react-loading-skeleton"; // Import skeleton loading component
import Message from "./Message"; // Import custom Message component
import { useIntersection } from '@mantine/hooks'; // Import hook for intersection observation
import { useEffect, useRef, useState } from "react"; // Import React hooks

// Define interface for Messages component props
interface MessagesProps {
    fileId: string;
}

// Define Messages component
const Messages = ({ fileId }: MessagesProps) => {
    // Define loading message object
    const loadingMessages = {
        createdAt: new Date().toISOString(),
        id: 'loading-message',
        isUserMessage: false,
        text: (
            <span className='flex h-full items-center justify-center'>
                <Loader2 className='h-4 w-4 animate-spin' />
            </span>
        ),
    };

    // Fetch messages data using TRPC useInfiniteQuery hook
    const { data, isLoading, fetchNextPage } = trpc.getFileMessages.useInfiniteQuery({
        fileId,
        limit: INFINITE_QUERY_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
    });

    // Extract messages from data pages
    const messages = data?.pages.flatMap((page) => page.messages);

    // Define loading state
    const [showLoader, setShowLoader] = useState(true);

    // Combine loading message with fetched messages
    const combinedMessages = [
        ...(showLoader ? [loadingMessages] : []),
        ...(messages ?? []),
    ];

    // Define reference for last message intersection observer
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useIntersection({
        root: lastMessageRef.current,
        threshold: 1
    });

    // Fetch next page of messages when last message is intersected
    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage]);

    // Hide loader when response comes
    useEffect(() => {
        if (!isLoading) {
            setShowLoader(false);
        }
    }, [isLoading]);

    // Render messages in chat window
    return (
        <div className='flex- max-h[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col gap-4 
        overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 
        scrolling-touch'>
            {combinedMessages && combinedMessages.length > 0 ? (
                // Map through combined messages array in reverse order and render Message component
                combinedMessages.reverse().map((message, i) => {
                    const isNextMessageSamePerson = combinedMessages[i + 1]?.isUserMessage === combinedMessages[i]?.isUserMessage;

                    return (
                        <Message
                            ref={i === combinedMessages.length - 1 ? ref : null}
                            message={message}
                            isNextMessageSamePerson={isNextMessageSamePerson}
                            key={message.id}
                        />
                    );
                })
            ) : isLoading ? (
                // Render skeleton loading components when data is loading
                <div className='w-full flex flex-col gap-2'>
                    <Skeleton className='h-16' />
                    <Skeleton className='h-16' />
                    <Skeleton className='h-16' />
                    <Skeleton className='h-16' />
                </div>
            ) : (
                // Render message prompt when no messages are available
                <div className='flex-1 flex-col items-center justify-center gap-2'>
                    <MessageSquare className='h-8 w-8 text-blue-500' />
                    <h3 className='font-semibold text-xl'>You&apos;re all set</h3>
                    <p className='text-zinc-500 text-sm'>
                        Ask your question to get started...
                    </p>
                </div>
            )}
        </div>
    );
};

export default Messages;



