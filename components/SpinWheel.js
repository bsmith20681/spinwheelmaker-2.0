import React, { useEffect, useState } from "react";
import Winwheel from "../dependencies/winwheel";
import useScript from "../hooks/useScript";
import spinWheelBackground from "../public/images/wheel_01.png";

const SpinWheel = ({ segments }) => {
  useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js");
  useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js");
  let [theWheel, setTheWheel] = useState();

  useEffect(() => {
    setTheWheel(
      new Winwheel({
        canvasId: "wheel",
        responsive: true,
        pointerAngle: 90,
        numSegments: segments.length,
        textFontSize: 28,
        strokeStyle: "white",
        segments: segments,
        animation: {
          type: "spinToStop",
          duration: 5,
          spins: 8,
          callbackFinished: (indicatedSegment) => {
            console.log(indicatedSegment);
          },
          callBackAfter: "drawTriangle()",
          //callbackSound: playSound,
        },
      })
    );
  }, [segments]);
  return (
    <div>
      <canvas
        onClick={() => {
          theWheel.startAnimation();
        }}
        style={{ backgroundImage: `url(${spinWheelBackground.src})` }}
        id="wheel"
        className="mt-5 w-96 cursor-pointer bg-cover bg-center p-7 md:w-[500] xl:w-[520px]"
        width="520"
        height="520"
      ></canvas>
    </div>
  );
};

export default SpinWheel;
