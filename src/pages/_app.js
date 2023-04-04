import { useState } from 'react';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';
import '@/styles/globals.css'
import reactQueryClient from "@/config/react-query";



export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => reactQueryClient);
  return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <NextNProgress height={5} color={'#1890FF'} />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </Hydrate>
      </QueryClientProvider>
  );
}
