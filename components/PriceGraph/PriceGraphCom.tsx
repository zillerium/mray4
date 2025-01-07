// PriceGraphCom.tsx

"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { useContractRead } from "wagmi";
import priceABI from "@/lib/priceABI.json"; // Import ABI for the PriceHistory contract
import priceAddress from "@/lib/priceAddress.json"; // Import address for the PriceHistory contract
import PriceGraphDraw from "@/components/PriceGraph/PriceGraphDraw"; // Import the new graph component
import PriceGraphData from "@/components/PriceGraph/PriceGraphData"; // Import the new graph component

export default function PriceGraphCom() {
    const [prices, setPrices] = useState<{ index: number; price: number; mraySupply: number; usdcSupply: number }[]>([]);

    // Read the contract using wagmi's useContractRead
    const { data: priceData, isError, isLoading } = useContractRead({
        address: priceAddress.address as `0x${string}`, // PriceHistory contract address
        abi: priceABI, // PriceHistory contract ABI
        functionName: "getAllPrices",
    });

    // Process the data when fetched
    useEffect(() => {
        if (priceData && Array.isArray(priceData)) {
            const filteredPrices = priceData
                .map((entry, idx) => ({
                    index: Number(entry.index?.toString() || idx), // Use `entry.index` if available, fallback to `idx`
                    price: Number(entry.price.toString()), // Convert BigInt to number for display
                    mraySupply: Number(entry.mray_supply.toString()), // Convert BigInt to number for MRAY supply
                    usdcSupply: Number(entry.usdc_supply.toString()), // Convert BigInt to number for USDC supply
                }))
                .filter((entry) => entry.price > 0); // Filter out prices equal to 0
            setPrices(filteredPrices);
        }
    }, [priceData]);

    return (
        <div>
            <Navbar />

            <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">Price Graph</h1>

                {/* Show Loading or Error */}
                {isLoading && <p>Loading prices...</p>}
                {isError && <p>Error loading prices. Please try again later.</p>}

                {/* Display Prices in a Graph */}
                {!isLoading && prices.length > 0 && (
                    <div className="w-full">
                        <PriceGraphDraw data={prices} />
                        <PriceGraphData data={prices} />
                    </div>
                )}

                {/* No Prices Fetched */}
                {!isLoading && prices.length === 0 && <p>No prices available.</p>}
            </main>
        </div>
    );
}


