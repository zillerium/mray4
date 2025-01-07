interface ArrowLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string; // Optional, defaults to "#000"
  strokeWidth?: number; // Optional, defaults to 2
}

const ArrowLine: React.FC<ArrowLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  stroke = "#000",
  strokeWidth = 2,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", overflow: "visible" }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={stroke} />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

export default ArrowLine;

