
"use client"
import { PropsWithChildren, useState } from 'react';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { httpBatchLink } from "@trpc/client";
import { absoluteUrl } from '@/lib/utils';

const Providers = ({ children }: PropsWithChildren) => {
  // Initialize queryClient
  const [queryClient] = useState(() => new QueryClient());

  // Initialize trpcClient
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl("/api/trpc"),
        }),
      ],
    })
  )

  return (
    <trpc.Provider 
    client={trpcClient} 
     queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers
