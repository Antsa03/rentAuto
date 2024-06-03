"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import TailwindProvider from "./TailwindProvider.component";

type Props = {
  children?: React.ReactNode;
};

//React query
const queryClient = new QueryClient();

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>{children}</AntdRegistry>
        <TailwindProvider />
      </QueryClientProvider>
    </SessionProvider>
  );
};
