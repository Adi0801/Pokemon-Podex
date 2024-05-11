"use client"

import React, { useState } from 'react'
import {trpc} from "./client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/react-query';


import { absoluteUrl } from '@/lib/utils';


function Provider({children}:{children:React.ReactNode}) {

    const port = process.env.PORT

    const[queryClient] = useState(() => new QueryClient({}));
    const[trpcClient] = useState(
        trpc.createClient({
            links: [
                httpBatchLink({
                    url:absoluteUrl("/api/trpc")
                })
            ]
        })
    )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default Provider