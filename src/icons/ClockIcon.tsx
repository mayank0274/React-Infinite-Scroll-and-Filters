import React from "react";

interface Props {
  width: string;
  height: string;
  color?: string;
}
export const ClockIcon: React.FC<Props> = ({ width, height, color }) => {
  return (
    <svg
      height={height}
      id="Capa_1"
      width={width}
      fill="#000000"
      version="1.1"
      viewBox="0 0 23.612 23.612"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <g>
              <path
                style={{ fill: color ? color : "#000" }}
                d="M16.192,5.224V4.487h-8.77v0.737c0,0,1.334,3.713,3.838,5.428v1.785c0,0-2.761,2.686-3.838,5.775 v0.842h8.77v-0.842c-1.399-3.41-3.837-5.775-3.837-5.775v-1.785C15.759,7.726,16.192,5.224,16.192,5.224z"
              />
            </g>
            <g>
              <path
                style={{ fill: color ? color : "#000" }}
                d="M19.353,3.856V2.529h1.258V0H3.002v2.529h1.259v1.327c0,2.025,3.634,7.555,3.804,7.955 c-0.167,0.397-3.804,5.929-3.804,7.946v1.325H3.002v2.53h17.609v-2.53h-1.258v-1.325c0-2.025-3.635-7.521-3.829-7.951 C15.718,11.376,19.353,5.88,19.353,3.856z M18.096,19.757v1.325H5.519v-1.325c0-1.455,3.854-7.222,3.854-7.951 s-3.854-6.495-3.854-7.95V2.529h12.578v1.327c0,1.455-3.886,7.221-3.886,7.95C14.21,12.535,18.096,18.302,18.096,19.757z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
