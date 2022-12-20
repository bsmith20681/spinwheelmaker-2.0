import React, { useEffect, useState } from "react";

import useScript from "../hooks/useScript";

const SpinWheel = ({ spinTheWheel }) => {
  useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js");
  useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js");

  return (
    <div className="flex h-full items-center justify-center bg-white  p-5">
      <canvas onClick={spinTheWheel} id="wheel" className="w-full max-w-5xl cursor-pointer bg-cover bg-center p-9 " width="700" height="700"></canvas>
    </div>
  );
};

export default SpinWheel;
