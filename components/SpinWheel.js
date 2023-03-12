import React, { useEffect } from "react";
import DropShadowBackground from "../public/images/wheel-drop-shadow.png";

import useScript from "../hooks/useScript";

const SpinWheel = ({ spinTheWheel }) => {
  useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js");
  useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js");

  return (
    <div className="relative mb-5 flex  items-center justify-center bg-white  md:mb-0">
      <canvas
        style={{ shadowBlur: 20, shadowOffsetX: "20" }}
        data-responsiveminmidth="180"
        data-responsivescaleheight="true" /* Optional Parameters */
        data-responsivemargin="80"
        onClick={spinTheWheel}
        width="700"
        height="700"
        id="wheel"
        className="w-full max-w-5xl cursor-pointer bg-cover bg-center  md:p-9"
      ></canvas>

      <img onClick={spinTheWheel} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer" src="../images/pointer.png" alt="pointer" />
    </div>
  );
};

export default SpinWheel;
