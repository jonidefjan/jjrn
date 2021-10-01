import Head from "next/head";
import { NumbersProvider } from "../contexts/NumbersContext";

import "../css/customcss.css";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <NumbersProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </NumbersProvider>
  );
}
export default MyApp;
