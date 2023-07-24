import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ResponsiveDrawer from "@/components/Drawer";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c93636",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveDrawer>
          <Head>
            <title>Hobbies</title>
            <meta name="description" content="Hobbies app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </ResponsiveDrawer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
