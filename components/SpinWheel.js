import React, { useContext, useEffect, useState } from "react";
import Winwheel from "../dependencies/winwheel";
import useScript from "../hooks/useScript";

const SpinWheel = (props) => {
  useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js");
  useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js");
  let [theWheel, setTheWheel] = useState();

  useEffect(() => {
    setTheWheel(
      (theWheel = new Winwheel({
        canvasId: "wheel",
        responsive: true,
        pointerAngle: 90,
        numSegments: 4,
        textFontSize: 28,
        strokeStyle: "#ffffff",
        segments: props.segments,
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
      }))
    );
  }, []);
  return (
    <div>
      <canvas
        onClick={() => {
          theWheel.startAnimation();
        }}
        id="wheel"
        className="mt-5 w-96 cursor-pointer md:w-[500] xl:w-[520px]"
        width="520"
        height="520"
      ></canvas>
    </div>
  );
};

export default SpinWheel;
