import WalletIcon from "@/components/Admin/WalletIcon";
import VaultIcon from "@/components/Admin/VaultIcon";
import CoinIcon from "@/components/Admin/CoinIcon";
import ArrowLine from "@/components/Admin/ArrowLine";
import TextLabel from "@/components/Admin/TextLabel";

const FlowDiagram = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 500"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      <TextLabel x={400} y={20} text="Stablecoin Tokenomics" fontSize="20" />
      {/* Investor Wallet */}
      <WalletIcon x={50} y={50} />
      <TextLabel x={100} y={140} text="Investor Wallet" fontSize="16" />

      {/* Car Owner Wallet */}
      <WalletIcon x={600} y={50} />
      <TextLabel x={700} y={140} text="Car Owner Wallet" fontSize="16" />

      {/* Project Wallet */}
      <WalletIcon x={50} y={200} />
      <TextLabel x={100} y={290} text="Project Wallet" fontSize="16" />

      {/* USDC (Liquid) */}
      <VaultIcon x={250} y={75} />
      <TextLabel x={300} y={65} text="USDC (Liquid)" fontSize="16" />

      {/* NFT (RWA) */}
      <VaultIcon x={450} y={75} />
      <TextLabel x={500} y={65} text="NFT (RWA)" fontSize="16" />

      {/* MRAY Boxes */}
      <CoinIcon x={250} y={200} />
      <TextLabel x={280} y={290} text="Mray" fontSize="16" />

      <CoinIcon x={450} y={200} />
      <TextLabel x={530} y={290} text="Mray" fontSize="16" />

      {/* Combined MRAY */}
      <CoinIcon x={350} y={300} />
      <TextLabel x={410} y={390} text="Combined Mray" fontSize="16" />

      {/* Lines */}
      <ArrowLine x1={140} y1={90} x2={280} y2={110} stroke="#000" strokeWidth={2} />
      <ArrowLine x1={630} y1={75} x2={550} y2={125} stroke="#000" strokeWidth={2} />
      <ArrowLine x1={300} y1={150} x2={300} y2={200} stroke="#000" strokeWidth={2} />
      <ArrowLine x1={500} y1={150} x2={500} y2={200} stroke="#000" strokeWidth={2} />
      <ArrowLine x1={300} y1={275} x2={375} y2={330} stroke="#000" strokeWidth={2} />
      <ArrowLine x1={500} y1={275} x2={450} y2={330} stroke="#000" strokeWidth={2} />
      <ArrowLine x2={150} y2={225} x1={275} y1={225} stroke="#000" strokeWidth={2} />
      <ArrowLine x1={550} y1={225} x2={625} y2={100} stroke="#000" strokeWidth={2} />
    </svg>
  );
};

export default FlowDiagram;

