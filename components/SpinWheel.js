import React, { useEffect, useState } from "react";
import Winwheel from "../dependencies/winwheel";
import useScript from "../hooks/useScript";

const SpinWheel = ({ wheelSettings }) => {
  useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js");
  useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js");
  let [theWheel, setTheWheel] = useState();

  useEffect(() => {
    setTheWheel(
      new Winwheel({
        canvasId: "wheel",
        responsive: true,
        pointerAngle: 90,

        numSegments: wheelSettings.segments.length,
        textFontSize: 28,
        strokeStyle: "white",
        segments: wheelSettings.segments,
        animation: {
          type: "spinToStop",
          duration: wheelSettings.spinDuration,
          spins: wheelSettings.numOfSpins,
          callbackFinished: (indicatedSegment) => {
            console.log(indicatedSegment);
          },
          callBackAfter: "drawTriangle()",
          //callbackSound: playSound,
        },
      })
    );
  }, [wheelSettings]);
  return (
    <div className="flex h-full items-center justify-center bg-white  p-5">
      <canvas
        onClick={() => {
          theWheel.startAnimation();
        }}
        id="wheel"
        className="w-full max-w-5xl cursor-pointer bg-cover bg-center p-9 "
        width="700"
        height="700"
      ></canvas>
    </div>
  );
};

export default SpinWheel;
