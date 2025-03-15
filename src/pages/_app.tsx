import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { StateProvider } from "@/hooks/stateContext";
import AppLayout from "@/components/appLayout";

type LayoutType = "dashboard";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: LayoutType;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout == "dashboard"
      ? (page: ReactNode) => (
          <StateProvider>
            {" "}
            <AppLayout>{page}</AppLayout>
          </StateProvider>
        )
      : (page: ReactElement) => page;

  return <>{getLayout(<Component {...pageProps} />)}</>;
}
