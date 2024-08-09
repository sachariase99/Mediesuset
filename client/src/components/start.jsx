import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiScissors2Fill } from "react-icons/ri";
import { AiFillSnippets } from "react-icons/ai";
import { FaArrowDown } from "react-icons/fa";

const Start = () => {
  // State for each item
  const [item1Visible, setItem1Visible] = useState(false);
  const [item2Visible, setItem2Visible] = useState(false);
  const [item3Visible, setItem3Visible] = useState(false);
  const [item4Visible, setItem4Visible] = useState(false);

  useEffect(() => {
    // Timers for each item
    const timer1 = setTimeout(() => setItem1Visible(true), 3000); // 3 seconds
    const timer2 = setTimeout(() => setItem2Visible(true), 1500); // 1.5 seconds
    const timer3 = setTimeout(() => setItem3Visible(true), 2000); // 2 seconds
    const timer4 = setTimeout(() => setItem4Visible(true), 4000); // 4 seconds

    // Cleanup timers if component unmounts
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-500 to-pink-500 h-[100vh] w-full relative">
      <Link
        to="/home"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black px-6 py-2 rounded-lg hover:bg-[#ffffff52] text-xl ${
          item1Visible ? "opacity-100" : "opacity-0"
        }`}
      >
        Continue
      </Link>
      <div
        className={`text-9xl -rotate-[31deg] absolute top-[20%] right-[35%] ${
          item2Visible ? "opacity-10" : "opacity-0"
        }`}
      >
        <RiScissors2Fill />
      </div>
      <div
        className={`text-9xl -rotate-[31deg] absolute top-[75%] left-[10%] ${
          item3Visible ? "opacity-10" : "opacity-0"
        }`}
      >
        <AiFillSnippets />
      </div>
      <div
        className={`text-9xl absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flash ${
          item4Visible ? "opacity-30" : "opacity-0"
        }`}
      >
        <FaArrowDown />
      </div>
    </div>
  );
};

export default Start;
