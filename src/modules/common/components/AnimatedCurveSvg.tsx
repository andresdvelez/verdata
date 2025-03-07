import React from "react";

export const AnimatedCurveSvg = ({ stroke = "#fff" }: { stroke?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Vector72"
      width="242"
      height="22"
      viewBox="0 0 242 22"
      fill="none"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    >
      <script
        async
        src="chrome-extension://hoklmmgfnpapgjgcpechhaamimifchmp/frame_ant/frame_ant.js"
      />
      <path
        d="M1 21C13.463 21 25.5321 13.5142 41.5138 6.54708C57.4956 -0.420004 71.5197 -4.08679 63.9929 15.8975C59.694 27.3116 82.262 12.2787 89.2712 8.94827C96.2803 5.61785 105.264 1.04769 104.791 7.79218C104.319 14.5367 103.332 20.4963 119.433 17.1915C131.178 14.7805 142.347 10.2428 154.115 7.79218C183.047 1.76719 211.779 4.30101 241 4.30101"
        stroke={stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="0,0,0,278.5245361328125"
      >
        <animate
          attributeType="XML"
          attributeName="stroke-dasharray"
          repeatCount="1"
          dur="1.3888888888888888s"
          values="0,0,0,278.5245361328125;            0,139.26226806640625,139.26226806640625,0;            278.5245361328125,0,0,0"
          keyTimes="0; 0.5; 1"
          fill="freeze"
        />
      </path>
    </svg>
  );
};
