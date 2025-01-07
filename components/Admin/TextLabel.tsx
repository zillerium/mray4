interface TextLabelProps {
  x: number; // x-coordinate for the text
  y: number; // y-coordinate for the text
  text: string; // The actual text to display
  fontSize?: string; // Optional: Font size with default value
  fontFamily?: string; // Optional: Font family with default value
  fill?: string; // Optional: Fill color with default value
  fontWeight?: string; // Optional: Font weight with default value
  textAnchor?: string; // Optional: Text anchor position with default value
}

const TextLabel: React.FC<TextLabelProps> = ({
  x,
  y,
  text,
  fontSize = "14",
  fontFamily = "'Poppins', sans-serif",
  fill = "#333",
  fontWeight = "bold",
  textAnchor = "middle",
}) => {
  return (
    <text
      x={x}
      y={y}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fill={fill}
      fontWeight={fontWeight}
      textAnchor={textAnchor}
    >
      {text}
    </text>
  );
};

export default TextLabel;

