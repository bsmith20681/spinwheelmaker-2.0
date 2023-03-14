import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";

const Updates = () => {
  return (
    <Layout>
      <Head>
        <title>SpinWheelMaker.com | Updates</title>
        <meta name="description" content="We are always updating this site. See below all the progress we have made!" key="desc" />
        <meta property="og:title" content="SpinWheelMaker.com | Updates" />
        <meta property="og:description" content="We are always updating this site. See below all the progress we have made!" />
        <meta property="og:image" content="../public/images/screenshot.png" />
        <meta property="og:type" content="website"></meta>
        <meta name="viewport" content="initial-scale=1,width=device-width"></meta>
        <meta property="keywords" content="spin the wheel, spinwheelmaker.com, spin the wheel online, wheel decide, deciding wheel, random name picker, random picker wheel, random name picker"></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="../public/images/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../public/images/favicon-32x32.png" />
      </Head>
      <div className="container">
        <div className="mx-auto my-12 max-w-3xl">
          <p className="my-3 text-xl font-semibold">Recent Updates</p>

          <div className="my-3">
            <p className="font-semibold">✅ March 21st, 2023</p>
            <ul className="list-disc pl-8">
              <li>Launced SpinWheelMaker 2.0!</li>
              <li>Updated the site with a new look and feel</li>
              <li>added user login</li>
              <li>added the ability for a wheel to be saved even if you are not logged in</li>
              <li>Add full screen mode and additional settings menu</li>
              <li>Added new landing page with site details</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Updates;
