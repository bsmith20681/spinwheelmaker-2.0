import "../styles/globals.css";
import UserContext from "../context/UserContext";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserContext>
        <Component {...pageProps} />

        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-RXVXS5JZB5" />
        <Script id="google-analytics" strategy="lazyOnload">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-RXVXS5JZB5');
          `}</Script>
      </UserContext>
    </>
  );
}

export default MyApp;
