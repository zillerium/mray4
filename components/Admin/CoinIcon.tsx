import coinPath from "@/components/Admin/coinPath";

interface CoinIconProps {
  x?: number; // x-coordinate as a number
  y?: number; // y-coordinate as a number
  width?: string; // width as a string (e.g., "15%")
  height?: string; // height as a string (e.g., "15%")
}

const CoinIcon: React.FC<CoinIconProps> = ({
  x = 0,
  y = 0,
  width = "15%",
  height = "15%",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x={x} // Accepts only numeric values
      y={y} // Accepts only numeric values
      width={width}
      height={height}
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={coinPath}
        fill="none"
        stroke="#000000"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CoinIcon;

