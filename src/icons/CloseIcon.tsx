interface Props {
  width: string;
  height: string;
  className?: string;
  color?: string;
  handlerFn: (value?: string) => void;
}
export const CloseIcon = ({
  width,
  height,
  className,
  handlerFn,
  color,
}: Props) => {
  return (
    <svg
      height={height}
      width={width}
      className={className}
      onClick={() => {
        handlerFn();
      }}
      version="1.1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Close</title>
      <g
        id="Page-1"
        fill="none"
        fillRule="evenodd"
        stroke="none"
        strokeWidth="1"
      >
        <g id="Close">
          <rect
            height="24"
            id="Rectangle"
            width="24"
            fillRule="nonzero"
            x="0"
            y="0"
          />
          <line
            id="Path"
            stroke={color ? color : "#000"}
            strokeLinecap="round"
            strokeWidth="2"
            x1="16.9999"
            x2="7.00001"
            y1="7"
            y2="16.9999"
          />
          <line
            id="Path"
            stroke={color ? color : "#000"}
            strokeLinecap="round"
            strokeWidth="2"
            x1="7.00006"
            x2="17"
            y1="7"
            y2="16.9999"
          />
        </g>
      </g>
    </svg>
  );
};
