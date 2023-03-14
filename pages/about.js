import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";

const About = () => {
  return (
    <Layout>
      <Head>
        <title>SpinWheelMaker.com | About Us</title>
        <meta name="description" content="Spinwheelmaker.com is a website about helping to make a random choice." key="desc" />
        <meta property="og:title" content="SpinWheelMaker.com | About Us" />
        <meta property="og:description" content="Spinwheelmaker.com is a website about helping to make a random choice." />
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
          <p className="my-3 text-xl font-semibold">Welcome to SpinWheelMaker.com!</p>
          <p className="mb-3">Our goal here is to help you make a random choice by removing all the bias. So if you are trying to decide what to eat for lunch or pick a random name for a raffle we have you covered.</p>
          <p className="mb-3">{`Our free to use software is powered by JavaScript's power Random algorithm. This means that SpinWheelMaker.com can not be rigged. So rest be assured that whatever the wheel lands on it was truly at random.`}</p>
          <p className="mb-3">
            So what are you waiting for?
            <Link href="/create">
              <a className="underline">Click here to get started today!</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
