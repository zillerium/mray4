// NavigationBox.tsx

import React from 'react';
import Link from 'next/link';

interface NavigationBoxProps {
  href: string;
  title: string;
}

const NavigationBox: React.FC<NavigationBoxProps> = ({ href, title }) => (
  <Link href={href} passHref>
    <div className="bg-[#bde0fe] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-1">
      <h3 className="text-lg font-semibold mb-2 ">{title}</h3>
    </div>
  </Link>
);

export default NavigationBox;

