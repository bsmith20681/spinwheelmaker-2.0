import Layout from "../components/Layout";
import Head from "next/head";
import SpinWheelContainer from "../components/SpinWheelContainer";
import { nanoid } from "nanoid";
import Script from "next/script";

const Create = () => {
  return (
    <Layout isAuth={false}>
      <Head>
        <title>SpinWheelMaker.com | Create a Spin Wheel Online to Randomly Decide Something</title>
        <meta name="description" content="Create a spin wheel online that will allow you to randomly decide something by filling out the inputs and click spin wheel." key="desc" />
        <meta property="og:title" content="SpinWheelMaker.com | Create a Spin Wheel Online to Randomly Decide Something" />
        <meta property="og:description" content="Create a spin wheel online that will allow you to randomly decide something by filling out the inputs and click spin wheel." />
        <meta property="og:image" content="../public/images/screenshot.png" />
        <meta property="og:type" content="website"></meta>
        <meta name="viewport" content="initial-scale=1,width=device-width"></meta>
        <meta property="keywords" content="spin the wheel, spinwheelmaker.com, spin the wheel online, wheel decide, deciding wheel, random name picker, random picker wheel, random name picker"></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="../public/images/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../public/images/favicon-32x32.png" />
      </Head>
      <SpinWheelContainer
        segments={[
          { id: "0", fillStyle: "#52AB84", text: "Pizza" },
          { id: "1", fillStyle: "#D96B75", text: "Burger" },
          { id: "2", fillStyle: "#47B2C2", text: "Tacos" },
          { id: "3", fillStyle: "#DA9457", text: "Fries" },
          { id: "4", fillStyle: "#DEC85E", text: "Pasta" },
          { id: "5", fillStyle: "#325D89", text: "Hot Dogs" },
          { id: "6", fillStyle: "#6A4A80", text: "Fried Chicken" },
        ]}
        title="What to eat for Lunch?"
        shortID={nanoid(11)}
        iteration={0}
        spinDuration={5}
        confettiOn={true}
        soundOn={true}
      />
      <Script id="ezoic-script-1" strategy="afterInteractive">{`var ezoicId = 322222;`}</Script>
    </Layout>
  );
};

export default Create;
