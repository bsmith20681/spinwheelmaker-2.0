import React, { useEffect } from "react";
import DropShadowBackground from "../public/images/wheel-drop-shadow.png";

import useScript from "../hooks/useScript";

const SpinWheel = ({ spinTheWheel }) => {
  useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js");
  useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js");

  return (
    <div className="relative flex h-full items-center justify-center  bg-white">
      <canvas style={{ shadowBlur: 20, shadowOffsetX: "20" }} onClick={spinTheWheel} id="wheel" className="w-full max-w-5xl cursor-pointer bg-cover bg-center p-9 " width="700" height="700"></canvas>
      <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform" src="../images/pointer.png" alt="pointer" />
    </div>
  );
};

export default SpinWheel;
