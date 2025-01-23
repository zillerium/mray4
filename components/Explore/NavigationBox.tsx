// NavigationBox.tsx

import React from 'react';
import Link from 'next/link';

interface NavigationBoxProps {
  href: string;
  title: string;
}

const NavigationBox: React.FC<NavigationBoxProps> = ({ href, title }) => (
  <Link href={href} passHref>
    <div className="bg-[#bde0fe] p-6 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
    </div>
  </Link>
);

export default NavigationBox;

