import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import axios from "axios";

import SpinWheelContainer from "../../components/SpinWheelContainer";

const ViewWheel = () => {
  const router = useRouter();
  const { shortID, iteration } = router.query;
  const [response, setResponse] = useState(null);
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shortID) {
      return;
    }
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/spinwheel/${shortID}`,
    })
      .then((data) => {
        //older entries may not have the size and weightValue property this checks for that and places it in on older entries
        const segmentsFromDB = data.data.data[0].iteration.at(-1).segments;

        const segmentsHasWeightValue = segmentsFromDB.some((item) => {
          return item.hasOwnProperty("weightValue") && item.hasOwnProperty("size");
        });

        if (segmentsHasWeightValue) {
          setSegments(segmentsFromDB);
          setResponse(data.data.data[0]);
          setLoading(false);
        } else {
          const updateWeightValues = segmentsFromDB.map((item) => {
            return {
              ...item,
              weightValue: 1,
              size: 360 / segmentsFromDB.length,
            };
          });

          setSegments(updateWeightValues);
          setResponse(data.data.data[0]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shortID]);

  return loading ? (
    <Layout>
      <div className="container">
        <h1>still loading</h1>
      </div>
    </Layout>
  ) : (
    <Layout>
      <Head>
        <title>SpinWheelMaker.com | {response.iteration.at(-1).title}</title>
        <meta name="description" content={`Check out the spinwheel ${response.iteration.at(-1).title}. Use it to randomly decide on something`} key="desc" />
        <meta property="og:title" content={`SpinWheelMaker.com | ${response.iteration.at(-1).title}`} />
        <meta property="og:description" content={`Check out the spinwheel ${response.iteration.at(-1).title}. Use it to randomly decide on something`} />
        <meta property="og:image" content="../public/images/screenshot.png" />
        <meta property="og:type" content="website"></meta>
        <meta name="viewport" content="initial-scale=1,width=device-width"></meta>
        <meta property="keywords" content="spin the wheel, spinwheelmaker.com, spin the wheel online, wheel decide, deciding wheel, random name picker, random picker wheel, random name picker"></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="../public/images/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../public/images/favicon-32x32.png" />
      </Head>

      <SpinWheelContainer
        segments={segments}
        iteration={response.iteration.at(-1) + 1}
        shortID={response.shortID}
        title={response.iteration.at(-1).title}
        spinDuration={response.settings.spinDuration}
        confettiOn={response.settings.confettiOn}
        soundOn={response.settings.soundOn}
      />
    </Layout>
  );
};

export default ViewWheel;
