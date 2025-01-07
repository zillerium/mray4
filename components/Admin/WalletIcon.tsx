/* eslint-disable react/prop-types */
import walletPath from "@/components/Admin/walletPath";

interface WalletIconProps {
  x?: number; // Optional: x-coordinate of the icon
  y?: number; // Optional: y-coordinate of the icon
  width?: string; // Optional: Width as a percentage or pixel value
  height?: string; // Optional: Height as a percentage or pixel value
}

const WalletIcon: React.FC<WalletIconProps> = ({
  x = 0,
  y = 0,
  width = "15%",
  height = "15%",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x={x} // Numeric x-coordinate
      y={y} // Numeric y-coordinate
      width={width} // String width (e.g., "15%")
      height={height} // String height (e.g., "15%")
      viewBox="0 0 111.16 122.88"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={walletPath}
        fill="#f3f4f6"
        stroke="#000"
        strokeWidth="2"
      />
    </svg>
  );
};

export default WalletIcon;

