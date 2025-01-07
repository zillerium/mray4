// PriceGraphData.tsx

"use client";

import React from "react";

type PriceGraphDataProps = {
    data: { index: number; price: number; mraySupply: number; usdcSupply: number }[];
};

const PriceGraphData: React.FC<PriceGraphDataProps> = ({ data }) => {
    return (
        <div className="w-full mt-6">
            <h2 className="text-lg font-semibold mb-4">Price Data</h2>
            <table className="table-auto border-collapse border border-gray-200 w-full text-left">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Index</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">MRAY Supply</th>
                        <th className="border border-gray-300 px-4 py-2">USDC Supply</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr key={entry.index}>
                            <td className="border border-gray-300 px-4 py-2">{entry.index}</td>
                            <td className="border border-gray-300 px-4 py-2">{entry.price}</td>
                            <td className="border border-gray-300 px-4 py-2">{entry.mraySupply}</td>
                            <td className="border border-gray-300 px-4 py-2">{entry.usdcSupply}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PriceGraphData;

