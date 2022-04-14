import "../styles/globals.css";
import "bootswatch/dist/lumen/bootstrap.min.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Word Combiner</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
