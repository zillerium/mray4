'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import GetWalletHeader from '@/components/Util/GetWalletHeader';
import BondText from '@/components/Help/BondText';
import NftText from '@/components/Help/NftText';
import BondMaturityText from '@/components/Help/BondMaturityText';
import PerpetualBondText from '@/components/Help/PerpetualBondText';
import RedeemNftText from '@/components/Help/RedeemNftText';
import NftLiquidityText from '@/components/Help/NftLiquidityText';
import MrayTokenText from '@/components/Help/MrayTokenText';
import UsdcDepositsText from '@/components/Help/UsdcDepositsText';
import FeesText from '@/components/Help/FeesText';
import RiskText from '@/components/Help/RiskText';

const HelpCom: React.FC = () => {
  const faqs = [
    { question: 'So, how do Bonds work?', answer: BondText },
    { question: 'What is an NFT for my RWA?', answer: NftText }, // Placeholder for now
    { question: 'How does Bond Maturity work?', answer: BondMaturityText },
    { question: 'Can Bonds be Perpetual?', answer: PerpetualBondText },
    { question: 'OK, but does this mean I lose my NFT?', answer: RedeemNftText },
    { question: 'Can I really get liquidity for my NFT?', answer: NftLiquidityText },
    { question: 'What is the MRAY token?', answer: MrayTokenText },
    { question: 'How do I deposit USDC?', answer: UsdcDepositsText },
    { question: 'Are there fees?', answer: FeesText },
    { question: 'Sounds good, but are there risks?', answer: RiskText },
  ];

  return (
    <div>
      <Navbar />
      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />

<h1
  className="flex items-center justify-center text-4xl md:text-5xl font-normal leading-tight mb-8 text-center"
  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
>
  When it comes to liquidity and bonds, everyone has questions.
</h1>


        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h4
                className="text-2xl md:text-3xl font-normal leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
              >
                {faq.question}
              </h4>
              <p
                className="text-base md:text-lg leading-relaxed text-gray-700"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HelpCom;

